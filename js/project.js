displayProjectList().then(
    function (results)
    {

        for (let i = 0; i < results.length; i++)
        {

            const newDiv = document.createElement("div");
            newDiv.className="col";

            const  cardDiv = document.createElement("div");
            cardDiv.className="card h-100";

            const  bodyDiv = document.createElement("div");
            bodyDiv.className="card-body";

            const projDate = document.createElement("small");
            projDate.className = "text-muted";
            projDate.innerHTML = results[i].startDate + " To " +results[i].completionDate;
            bodyDiv.appendChild(projDate);

            const projContractValue = document.createElement("p");
            projContractValue.className = "card-text";
            projContractValue.innerHTML = results[i].contractValue+" "+results[i].currency;
            bodyDiv.appendChild(projContractValue);

            const projTitle = document.createElement("h5");
            projTitle.className = "card-title";
            projTitle.innerHTML = results[i].projectTitle;
            bodyDiv.appendChild(projTitle);

            const moreButton = document.createElement("a");
            moreButton.className = "btn btn-outline-primary btn-sm";
            moreButton.href = "projectDetails.html?id="+results[i].projectId;
            moreButton.innerHTML = "View Project";
            bodyDiv.appendChild(moreButton);

            cardDiv.appendChild(bodyDiv);
            newDiv.appendChild(cardDiv);
            document.getElementById("tableBody").appendChild(newDiv);

        }
    }, // doesn't run
    function (error)
    {
        alert(error);
    }
);
async function displayProjectList()
{
    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getAll';
    let getOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    const response = await fetch(url, getOptions);
    let dataResponse = response.json();
    return dataResponse;

}

async function createProject()
{
    const jsonProject = {
        "projectId": "", "projectTitle": "", "contractValue": 0, "variance": 0,
        "projectDuration": 12, "startDate": "", "durationExtension": "", "completionDate": "", "currency": ""
    };

    jsonProject.projectId = document.getElementById("floatingProjectId").value;
    if (jsonProject.projectId == "")
    {
        alert("ProjectID is NULL");
        return false;
    }

    jsonProject.projectTitle = document.getElementById("floatingProjectTitle").value;
    if (jsonProject.projectTitle == "")
    {
        alert("ProjectTitle is NULL");
        return false;
    }

    jsonProject.contractValue = document.getElementById("floatingContractValue").value;
    if (jsonProject.contractValue == 0)
    {
        alert("Contract Value is Zero (0)");
        return false;
    }
    jsonProject.variance = document.getElementById("floatingVariance").value;
    if (jsonProject.variance == 0)
    {
        alert("Variance Value is Zero (0)");
        return false;
    }

    jsonProject.currency = document.getElementById("floatingCurrency").value;
    if (jsonProject.currency == "")
    {
        alert("Currency Value is Zero (0)");
        return false;
    }

    jsonProject.projectDuration = document.getElementById("floatingProjectDuration").value;
    if (jsonProject.projectDuration == 0)
    {
        alert("Duration Value is Zero (0)");
        return false;
    }

    jsonProject.durationExtension = document.getElementById("floatingProjectDurationExtension").value;
    if (jsonProject.durationExtension < 0)
    {
        alert("Duration Extension Value is Not Valid");
        return false;
    }

    jsonProject.startDate = document.getElementById("floatingStartDate").value;
    if (jsonProject.startDate == null)
    {
        alert("StartDate value is NULL");
        return false;
    }

    jsonProject.completionDate = document.getElementById("floatingCompletionDate").value;
    if (jsonProject.completionDate == null)
    {
        alert("Completion Date value is NULL");
        return false;
    }


    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonProject) // body data type must match "Content-Type" header
    };

    const response1 = await fetch(url, options);
    let dataResponse1 = response1.json();
    dataResponse1.then(
        function (results)
        {
            window.location.reload();
        }, // doesn't run
        function (error)
        {
            alert(error);
        }
    );





}



