// this var is a reference to the DOM
var issuesContainer = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } else {
            alert("Error with request");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issuesContainer.textContent = "This repo has no open issues.";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // span el to hold issue TITLE
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to the issueEl container
        issueEl.appendChild(titleEl);

        // create el for issue TYPE
        var typeEl = document.createElement("span");

        // check if issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to the issueEl container
        issueEl.appendChild(typeEl);

        //append all created elements to the DOm
        issuesContainer.appendChild(issueEl);
    }
}

getRepoIssues("wolfgarb/wolfgarb");
