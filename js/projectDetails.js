const href = window.location.href.toString().trim();
const hrefArray = href.split("?");
const idValueArray = hrefArray[1].split("=");
const id = idValueArray[1];

let fidicpccId="";
let fidicgccId="";


setPCCSelectModal().then(
    function (pccsArray)
    {
        for (let i = 0; i < pccsArray.length; i++)
        {
            let selectOption = document.createElement("option");
            selectOption.value = i+1;
            selectOption.id = pccsArray[i].fidicPCCId;
            selectOption.innerHTML = pccsArray[i].fidicPCCTitle;
            document.getElementById("pccSelectModalId").appendChild(selectOption);
        }
    },
    function (error)
    {
        alert(error);
    }
);

setGCCSelectModal().then(
    function (gccsArray)
    {
        for (let i = 0; i < gccsArray.length; i++)
        {
            let selectOption = document.createElement("option");
            selectOption.value = i+1;
            selectOption.id = gccsArray[i].fidicGCCId;
            selectOption.innerHTML = gccsArray[i].fidicGCCTitle;
            document.getElementById("gccSelectModalId").appendChild(selectOption);
        }
    },
    function (error)
    {
        alert(error);
    }
)


displayProjectDetails(id).then(
    function (projectJsonObject)
    {
            document.getElementById("projectTitle").innerHTML = projectJsonObject.projectTitle;
            document.getElementById("projectTitleValue").innerHTML = projectJsonObject.projectTitle;
            document.getElementById("smallDuration").innerHTML = projectJsonObject.projectDuration;
            document.getElementById("smallExtension").innerHTML = projectJsonObject.durationExtension;
            document.getElementById("smallStartDate").innerHTML = projectJsonObject.startDate;
            document.getElementById("smallCompletionDate").innerHTML = projectJsonObject.completionDate;

            document.getElementById("smallContractValue").innerHTML = projectJsonObject.contractValue;
            document.getElementById("smallVariance").innerHTML = projectJsonObject.variance;
            document.getElementById("smallCurrency").innerHTML = projectJsonObject.currency.toUpperCase();

        },
    function (error)
    {
            alert(error);
    });

displayProjectClaims(id).then(
    function (claimsArray)
    {

        for (let i=0; i<claimsArray.length; i++)
        {
            let row = document.getElementById("claimTableBody").insertRow(i);

            let numberCell = row.insertCell(0);
            let idCell = row.insertCell(1);
            let categoryCell = row.insertCell(2);
            let causeCell = row.insertCell(3);
            let amountCell = row.insertCell(4);
            let currencyCell = row.insertCell(5);
            let moreCell = row.insertCell(6);

            numberCell.innerHTML= i+1;
            idCell.innerHTML = claimsArray[i].claimId;
            categoryCell.innerHTML = claimsArray[i].claimCategory;
            causeCell.innerHTML = claimsArray[i].claimCause;
            amountCell.innerHTML = claimsArray[i].claimAmount;
            currencyCell.innerHTML = claimsArray[i].currency.toUpperCase();

            const moreButton = document.createElement("a");
            moreButton.className = "btn btn-outline-primary btn-sm";
            moreButton.href="claimDetails.html?id="+claimsArray[i].claimId;
            moreButton.innerHTML = "View Claim";
            moreCell.appendChild(moreButton);


        }
    },
    function (error)
    {
        alert(error);
    });

displayProjectPCCs(id).then(
    function (pccsArray)
    {

        for (let i=0; i<pccsArray.length; i++)
        {
            let row = document.getElementById("pccTableBody").insertRow(i);

            let numberCell1 = row.insertCell(0);
            let idCell = row.insertCell(1);
            let titleCell = row.insertCell(2);
            let descriptionCell = row.insertCell(3);

            numberCell1.innerHTML= i+1;
            idCell.innerHTML = pccsArray[i].fidicPCCId;
            titleCell.innerHTML = pccsArray[i].fidicPCCTitle;
            descriptionCell.innerHTML = pccsArray[i].fidicPCCDescription;

        }
    },
    function (error)
    {
        alert(error);
    });


async function setGCCSelectModal()
{
    const getAllGCCsUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/fidicgcc/getAll';
    let getAllGCCsOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    const response = await fetch(getAllGCCsUrl, getAllGCCsOptions);
    let allGCCs = response.json();
    return allGCCs;
}

async function setPCCSelectModal()
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getFidicPCCs?projectId='+id;

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    return projectData;
}


async function pccSelected()
{
    let selectBox = document.getElementById("pccSelectModalId");
    let selectedId = selectBox.options[selectBox.selectedIndex].id;
    fidicpccId = selectedId;
}

async function gccSelected()
{
    let selectBox = document.getElementById("gccSelectModalId");
    let selectedId = selectBox.options[selectBox.selectedIndex].id;
    fidicgccId = selectedId;
}

async function displayProjectDetails(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getById?projectId='+idValue;
    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    return projectData;
}
async function displayProjectClaims(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getClaims?projectId='+idValue;

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    return projectData;
}
async function displayProjectPCCs(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getFidicPCCs?projectId='+idValue;

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    return projectData;
}

async function displayAllPCCs()
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/fidicpcc/getAll';

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    projectData.then(
        function (pccsArray)
        {

            for (let i=0; i<pccsArray.length; i++)
            {
                let row = document.getElementById("allPccTableBody").insertRow(i);

                let numberCell111 = row.insertCell(0);
                let idCell = row.insertCell(1);
                let titleCell = row.insertCell(2);
                let descriptionCell = row.insertCell(3);
                let moreCell = row.insertCell(4);

                numberCell111.innerHTML= i+1;
                idCell.innerHTML = pccsArray[i].fidicPCCId;
                titleCell.innerHTML = pccsArray[i].fidicPCCTitle;
                descriptionCell.innerHTML = pccsArray[i].fidicPCCDescription;

                const moreButton = document.createElement("a");
                moreButton.className = "btn btn-outline-primary btn-sm";
                moreButton.href="attachPCC.html?projectID="+id+"&pccID="+pccsArray[i].fidicPCCId;
                moreButton.innerHTML = "select";
                //moreButton.id = pccsArray[i].fidicPCCId;
                //moreButton.addEventListener("click",attachPcc(pccsArray[i].fidicPCCId));
                moreCell.appendChild(moreButton);

            }

        },
        function (error)
        {
            alert(error);
        });

}

async function deleteProject()
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/deleteById?projectId=' + id;

    let projectOptions = {
        mode: 'cors',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.status;
    if (projectData == 200)
    {
        window.location.assign("project.html")
    }
    else
    {
        alert("Error code: "+projectData);
    }
}

async function addClaim()
{

    const jsonClaimToAdd = {
        "claimId": "", "claimCategory": "", "claimDescription": "", "claimAmount": 0,
        "claimExtension": 0, "claimCause": "", "currency": ""
    };

    jsonClaimToAdd.claimId = document.getElementById("floatingClaimId").value;
    if (jsonClaimToAdd.claimId == "") {
        alert("claimID IS NULL");
        return false;
    }

    jsonClaimToAdd.claimCategory = document.getElementById("floatingClaimCategory").value;
    if (jsonClaimToAdd.claimCategory == "") {
        alert("claim Category IS NULL");
        return false;
    }

    jsonClaimToAdd.claimDescription = document.getElementById("floatingClaimDescription").value;
    if (jsonClaimToAdd.claimDescription == "") {
        alert("claim Description IS NULL");
        return false;
    }

    jsonClaimToAdd.currency = document.getElementById("floatingCurrency").value;
    if (jsonClaimToAdd.currency == "") {
        alert("claim Currency IS NULL");
        return false;
    }

    jsonClaimToAdd.claimCause = document.getElementById("floatingClaimCause").value;
    if (jsonClaimToAdd.claimCause == "") {
        alert("claim Cause IS NULL");
        return false;
    }

    jsonClaimToAdd.claimAmount = document.getElementById("floatingClaimAmount").value;

    /**
     jsonClaim.claimExtension = document.forms["claimForm"]["claimExtension"].value;
     if (jsonClaim.claimExtension == 0)
     {
        return false;
    }
     jsonClaim.claimAmount = document.forms["claimForm"]["claimAmount"].value;
     if (jsonClaim.claimAmount == 0)
     {
        return false;
    }
     */






    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/saveUpdate?' + 'projectId=' + id + '&fidicPCCId=' + fidicpccId + '&fidicGCCId=' + fidicgccId;
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonClaimToAdd) // body data type must match "Content-Type" header
    };

    const response1 = await fetch(url, options);
    let dataResponse1 = response1.json();
    dataResponse1.then(
        function (results) {

            window.location.reload();
        },
        function (error) {
            alert(error);
        }
    );

}


