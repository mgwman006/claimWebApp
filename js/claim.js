let projectID="";
let fidicPCCID="";
let fidicGCCID="";

displayClaimList().then(
    function (claimsArray)
    {
        for (let i = 0; i < claimsArray.length; i++)
        {
            let row = document.getElementById("allClaimsTableBody").insertRow(i);

            let numberCellClaim = row.insertCell(0);
            let idCellClaim = row.insertCell(1);
            let categoryCellClaim = row.insertCell(2);
            let causeCellClaim = row.insertCell(3);
            let amountCellClaim = row.insertCell(4);
            let currencyCellClaim = row.insertCell(5);
            let moreCell = row.insertCell(6);

            numberCellClaim.innerHTML= i+1;
            idCellClaim.innerHTML = claimsArray[i].claimId;
            categoryCellClaim.innerHTML = claimsArray[i].claimCategory;
            causeCellClaim.innerHTML = claimsArray[i].claimCause;
            amountCellClaim.innerHTML = claimsArray[i].claimAmount;
            currencyCellClaim.innerHTML = claimsArray[i].currency.toUpperCase();

            const moreButton = document.createElement("a");
            moreButton.className = "btn btn-outline-primary btn-sm";
            moreButton.href="claimDetails.html?id="+claimsArray[i].claimId;
            moreButton.innerHTML = "View Claim";
            moreCell.appendChild(moreButton);
        }
    }, // doesn't run
    function (error)
    {
        alert(error);
    }

);

setGCCSelect().then(
    function (gccsArray)
    {
        for (let i = 0; i < gccsArray.length; i++)
        {
            let selectOption = document.createElement("option");
            selectOption.value = i+1;
            selectOption.id = gccsArray[i].fidicGCCId;
            selectOption.innerHTML = gccsArray[i].fidicGCCTitle;
            document.getElementById("gccSelectId").appendChild(selectOption);
        }
    },
    function (error)
    {
        alert(error);
    }
)

setProjectSelect().then(
    function (projectsArray)
    {
        for (let i = 0; i < projectsArray.length; i++)
        {
            let projectOption = document.createElement("option");
            projectOption.value = i+1;
            projectOption.innerHTML = projectsArray[i].projectTitle;
            projectOption.id = projectsArray[i].projectId;
            document.getElementById("projectSelectId").appendChild(projectOption);
        }

    },
    function (error)
    {
        alert(error);
    }
);





async function projectSelected()
{
    let selectBox = document.getElementById("projectSelectId");
    let selectedId = selectBox.options[selectBox.selectedIndex].id;
    projectID = selectedId;

    setPCCSelect(selectedId).then(
        function (pccsArray)
        {
            for (let i = 0; i < pccsArray.length; i++)
            {
                let selectOption = document.createElement("option");
                selectOption.value = i+1;
                selectOption.id = pccsArray[i].fidicPCCId;
                selectOption.innerHTML = pccsArray[i].fidicPCCTitle;
                document.getElementById("pccSelectId").appendChild(selectOption);
            }
        },
        function (error)
        {
            alert(error);
        }
    );

}

async function fidicPCCSelected()
{
    let selectBox = document.getElementById("pccSelectId");
    let selectedId = selectBox.options[selectBox.selectedIndex].id;
    fidicPCCID = selectedId;
}

async function fidicGCCSelected()
{
    let selectBox = document.getElementById("gccSelectId");
    let selectedId = selectBox.options[selectBox.selectedIndex].id;
    fidicGCCID = selectedId;
}

async function displayClaimList()
{
    const getAllClaimsUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/getAll';
    let getAllClaimsOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    const response = await fetch(getAllClaimsUrl, getAllClaimsOptions);
    let allClaims = response.json();
    return allClaims;
}

async function setPCCSelect(idValue)
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

async function setGCCSelect()
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

async function setProjectSelect()
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

async function createClaim()
{
    const jsonClaim = {
        "claimId": "", "claimCategory": "", "claimDescription": "", "claimAmount": 0,
        "claimExtension": 0, "claimCause": "",  "currency": ""
    };

    jsonClaim.claimId = document.getElementById("floatingClaimId").value;
    if (jsonClaim.claimId == "")
    {
        alert("claimId is NULL");
        return false;
    }

    jsonClaim.claimCategory = document.getElementById("floatingClaimCategory").value;
    if (jsonClaim.claimCategory == "")
    {
        alert("Claim Category is NULL");
        return false;
    }

    jsonClaim.claimDescription = document.getElementById("floatingClaimDescription").value;
    if (jsonClaim.claimDescription  == "")
    {
        alert("Claim Description is NULL");
        return false;
    }

    jsonClaim.currency = document.getElementById("floatingCurrency").value;
    if (jsonClaim.currency == "")
    {
        alert("Claim Currency is NULL");
        return false;
    }

    jsonClaim.claimCause = document.getElementById("floatingClaimCause").value;
    if (jsonClaim.claimCause == "")
    {
        alert("Claim Cause is NULL");
        return false;
    }

    jsonClaim.claimAmount = document.getElementById("floatingClaimAmount").value;
    jsonClaim.claimExtension = document.getElementById("floatingClaimExtension").value;

    /**
        if (jsonClaim.claimExtension == 0)
        {
            return false;
        }
        if (jsonClaim.claimAmount == 0)
        {
            return false;
        }
     */






    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/saveUpdate?'+'projectId='+projectID+'&fidicPCCId='+fidicPCCID+'&fidicGCCId='+fidicGCCID;
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'

        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonClaim) // body data type must match "Content-Type" header
    };

    const response1 = await fetch(url, options);
    let dataResponse1 = response1.json();
    dataResponse1.then(
        function (results)
        {
            window.location.reload();
        },
        function (error)
        {
            alert(error);
        }
    );
}