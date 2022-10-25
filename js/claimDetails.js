const claimhref = window.location.href.toString().trim();
const claimhrefArray = claimhref.split("?");
const idValueArray = claimhrefArray[1].split("=");
const claimId = idValueArray[1];


displayClaimDetails(claimId).then(
    function (claimJsonObject)
    {
        //document.getElementById("claimIdDiv").innerHTML = claimJsonObject.claimId;
        document.getElementById("claimDescriptionDiv").innerHTML = claimJsonObject.claimDescription;
        document.getElementById("claimCauseDiv").innerHTML = claimJsonObject.claimCause;
        //document.getElementById("claimStatusDiv").innerHTML = claimJsonObject.claimStatus;
        document.getElementById("claimCategoryDiv").innerHTML = claimJsonObject.claimCategory;
        document.getElementById("claimAmountDiv").innerHTML = claimJsonObject.claimAmount;
        document.getElementById("claimTimeExtensionDiv").innerHTML = claimJsonObject.claimExtension;

    },
    function (error)
    {
        alert(error);
    });

displayClaimPCCs(claimId).then(
    function (pccsArray)
    {

        for (let i=0; i<pccsArray.length; i++)
        {
            let row = document.getElementById("pccBody").insertRow(i);

            let numberCellClaim = row.insertCell(0);
            let idCell = row.insertCell(1);
            let titleCell = row.insertCell(2);
            let descriptionCell = row.insertCell(3);

            numberCellClaim.innerHTML= i+1;
            idCell.innerHTML = pccsArray[i].fidicPCCId;
            titleCell.innerHTML = pccsArray[i].fidicPCCTitle;
            descriptionCell.innerHTML = pccsArray[i].fidicPCCDescription;

        }
    },
    function (error)
    {
        alert(error);
    });

displayClaimGCCs(claimId).then(
    function (gccsArray)
    {

        for (let i=0; i<gccsArray.length; i++)
        {
            let row = document.getElementById("gccBody").insertRow(i);

            let numberCellClaimGCC = row.insertCell(0);
            let idCell = row.insertCell(1);
            let titleCell = row.insertCell(2);
            let descriptionCell = row.insertCell(3);

            numberCellClaimGCC.innerHTML= i+1;
            idCell.innerHTML = gccsArray[i].fidicGCCId;
            titleCell.innerHTML = gccsArray[i].fidicGCCTitle;
            descriptionCell.innerHTML = gccsArray[i].fidicGCCDescription;

        }
    },
    function (error)
    {
        alert(error);
    });


async function displayClaimPCCs(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/getFidicPCCs?claimId='+idValue;

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

async function displayClaimGCCs(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/getFidicGCCs?claimId='+idValue;

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

async function displayClaimDetails(idValue)
{
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/getById?claimId='+idValue;
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