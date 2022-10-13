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
    const url = 'http://localhost:8080/api/project/getAll';
    let getOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
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

    jsonProject.projectId = document.forms["projectForm"]["projectId"].value;
    if (jsonProject.projectId == "")
    {
        return false;
    }
    jsonProject.projectTitle = document.forms["projectForm"]["projectTitle"].value;
    if (jsonProject.projectTitle == "")
    {
        return false;
    }
    jsonProject.contractValue = document.forms["projectForm"]["contractValue"].value;
    if (jsonProject.contractValue == 0)
    {
        return false;
    }
    jsonProject.variance = document.forms["projectForm"]["variance"].value;
    if (jsonProject.variance == 0)
    {
        return false;
    }
    jsonProject.currency = document.forms["projectForm"]["currency"].value;
    if (jsonProject.currency == "")
    {
        return false;
    }
    jsonProject.projectDuration = document.forms["projectForm"]["projectDuration"].value;
    if (jsonProject.projectDuration == 0)
    {
        return false;
    }
    jsonProject.durationExtension = document.forms["projectForm"]["durationExtension"].value;
    if (jsonProject.durationExtension < 0)
    {
        return false;
    }
    jsonProject.startDate = document.forms["projectForm"]["startDate"].value;
    if (jsonProject.startDate == null)
    {
        return false;
    }
    jsonProject.completionDate = document.forms["projectForm"]["completionDate"].value;
    if (jsonProject.completionDate == null)
    {
        return false;
    }


    const url = 'http://localhost:8080/api/project/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
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
            //TODO;
            //window.location.assign("./claim.html")
        }, // doesn't run
        function (error)
        {
            alert(error);
        }
    );





}



