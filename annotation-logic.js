const fs = require('fs');
const { Octokit } = require('@octokit/rest');

async function createAnnotations(eslintReport, githubToken, repoOwner, repoName, pullNumber, sha) {
  const octokit = new Octokit({ auth: githubToken });

  for (const result of eslintReport) {
    for (const message of result.messages) {
      const annotation = {
        path: result.filePath.replace(`${process.cwd()}/`, ''),
        start_line: message.line,
        end_line: message.endLine || message.line,
        annotation_level: 'warning',
        message: message.message,
        title: message.ruleId || 'Code Suggestion',
      };

      // Create check run annotations
      await octokit.checks.create({
        owner: repoOwner,
        repo: repoName,
        name: 'ESLint Annotations',
        head_sha: sha,
        status: 'completed',
        conclusion: 'neutral',
        output: {
          title: 'Code Quality Suggestions',
          summary: `Annotations found in ${result.filePath}`,
          annotations: [annotation],
        },
      }).catch(error => {
        console.error(`Failed to create annotation for ${result.filePath}:`, error.message);
      });
    }
  }
}

const run = async () => {
  const eslintReport = JSON.parse(fs.readFileSync('eslint-report.json', 'utf-8'));

  // These would be set in the environment as part of the GitHub Action
  const githubToken = process.env.GITHUB_TOKEN;  // The GitHub Token
  const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
  const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
  const pullNumber = process.env.GITHUB_PULL_REQUEST_NUMBER;
  const sha = process.env.GITHUB_SHA;

  await createAnnotations(eslintReport, githubToken, repoOwner, repoName, pullNumber, sha);
};

run().catch(error => {
  console.error('Error running annotation script:', error);
});