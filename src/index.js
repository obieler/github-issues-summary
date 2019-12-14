
const got = require('got');

var config;
var countersByLabel = {};
var results = [];

function checkConfig (callback) {
  if (!config.token) {
    throw new Error('Token is not set in config file.');
  }
  if (!config.username && !config.organization) {
    throw new Error('Username or organization is not set in config file.');
  }
  if (!config.repositories) {
    throw new Error('No repository set in config file.');
  }
}

function resetCountersByLabel (labels) {
  for (const label of labels) {
    countersByLabel[label] = 0;
  }
}

function summarizeIssuesByRepo (response, repository) {
  var openIssuesCount = 0;
  resetCountersByLabel(config.labels);

  for (const issue of response) {
    if (!Object.prototype.hasOwnProperty.call(issue, 'pull_request')) {
      openIssuesCount++;
      if (!Object.prototype.hasOwnProperty.call(issue, 'label')) {
        for (const label of issue.labels) {
          if (label.name in countersByLabel) {
            countersByLabel[label.name]++;
          }
        }
      }
    }
  }

  var repoResult = {
    repository_name: repository,
    open_issue: openIssuesCount,
    open_issues_by_label: []
  };

  for (var key in countersByLabel) {
    repoResult.open_issues_by_label.push(
      {
        name: key,
        count: countersByLabel[key]
      }
    );
  }

  return (repoResult);
}

function getIssuesSummaryByRepo (req, repository) {
  return new Promise((resolve, reject) => {
    got(req, {
      json: true,
      headers: {
        Authorization: 'token ' + config.token
      }
    }).then((response) => {
      results = summarizeIssuesByRepo(response.body, repository);
      const data = results;
      resolve(data);
    }).catch((err) => reject(err));
  });
}

function getRepositoriesBaseUrl () {
  var baseUrl = 'https://api.github.com/repos/';
  // if organization is set, get repositories only in organization
  if (config.organization) {
    baseUrl += config.organization + '/';
  } else {
    baseUrl += config.username + '/';
  }
  return baseUrl;
}

function getIssuesSummary (configFile, callback) {
  config = configFile;
  checkConfig(callback);

  const baseUrl = getRepositoriesBaseUrl();

  const issuesSummaries = [];

  for (var repository of config.repositories) {
    const urlIssuesRepo = baseUrl + repository +
      '/issues?state=open&per_page=1000';
    issuesSummaries.push(getIssuesSummaryByRepo(urlIssuesRepo, repository));
  }
  Promise.all(issuesSummaries).then(function (data, repository) {
    callback(null, data);
  }).catch(function (err) {
    callback(err, null);
  });
}

module.exports.getIssuesSummary = getIssuesSummary;
