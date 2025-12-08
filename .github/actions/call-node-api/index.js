const core = require('@actions/core')
const fs = require('fs')
const path = require('path');
const { start } = require('repl');

async function callNodeApi() {
    try{
        // get the api url from inputs
        const apiUrl = core.getInput('api-url', { required: true});
        core.info(`Calling API: ${apiUrl}`)

        // call the api
        const response = await fetch(apiUrl);

        if (!response.ok){
            throw new Error(`API returned status ${response.status}`);
        };

        const data = await response.json()
        core.info(`API Response: ${JSON.stringify(data)}`);

        // validate the response
        if (!data.status || !data.service || !data.timestamp){
            throw new Error('Invalid API response: missing require fields');
        }

        // generate markdown
        const markdown =
        `## API Status
        - **Status:** ${data.status}
        - **Service:** ${data.service}
        - **Timestamp:** ${data.timestamp}`;

        core.info('Generated Markdown');
        core.info(markdown);

        // update the README file
        const readmePath = path.join(process.env.GITHUB_WORKSPACE, 'README.md');
        let readmeContent = fs.readFileSync(readmePath, 'utf8');

        const startMarker = '<!-- API_STATUS_START -->';
        const endMarker = '<!-- API_STATUS_END -->';
        
        const startIndex = readmeContent.indexOf(startMarker);
        const endIndex = readmeContent.indexOf(endMarker);
        
        if (startIndex === -1 || endIndex === -1){
            throw new Error('README.md missing API_STATUS markers');
        }

        // replace content between markers
        const newContent =
            readmeContent.substring(0, startIndex + startMarker.length) + '\n' +
            markdown + '\n' + readmeContent.substring(endIndex);

        fs.writeFileSync(readmePath, newContent);
        core.info('README.md updated successfuly!');

    } catch (error) {
        core.setFailed(`Action failed ${error.message}`);
    }
};

callNodeApi();