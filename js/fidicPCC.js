
displayPCCs().then(
    function (pccsArray)
    {

        for (let i=0; i<pccsArray.length; i++)
        {
            let row = document.getElementById("pccList").insertRow(i);

            let numberCellPcc = row.insertCell(0);
            let idCell = row.insertCell(1);
            let titleCell = row.insertCell(2);
            let descriptionCell = row.insertCell(3);

            numberCellPcc.innerHTML= i+1;
            idCell.innerHTML = pccsArray[i].fidicPCCId;
            titleCell.innerHTML = pccsArray[i].fidicPCCTitle;
            descriptionCell.innerHTML = pccsArray[i].fidicPCCDescription;

        }
    },
    function (error)
    {
        alert(error);
    });

async function displayPCCs()
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
    return projectData;
}

async function createPCC()
{
    const jsonPCC = {
        "fidicPCCId": "", "fidicPCCTitle": "", "fidicPCCDescription": ""
    };

    jsonPCC.fidicPCCId = document.getElementById("floatingPCCId").value;
    if (jsonPCC.fidicPCCId == "")
    {
        alert("PCCId is NULL");
        return false;
    }

    jsonPCC.fidicPCCTitle = document.getElementById("floatingPCCTitle").value;
    if (jsonPCC.fidicPCCTitle == "")
    {
        alert("PCC Title is NULL");
        return false;
    }

    jsonPCC.fidicPCCDescription = document.getElementById("floatingPCCDescription").value;
    if (jsonPCC.fidicPCCDescription == "")
    {
        alert("PCC Description is NULL");
        return false;
    }


    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/fidicpcc/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonPCC) // body data type must match "Content-Type" header
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