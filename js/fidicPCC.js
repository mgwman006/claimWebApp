
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
    const projectUrl = 'http://127.0.0.1:8080/api/fidicpcc/getAll';

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
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

    jsonPCC.fidicPCCId = document.forms["pccForm"]["pccId"].value;
    if (jsonPCC.fidicPCCId == "")
    {
        return false;
    }

    jsonPCC.fidicPCCTitle = document.forms["pccForm"]["pccTitle"].value;
    if (jsonPCC.fidicPCCTitle == "")
    {
        return false;
    }

    jsonPCC.fidicPCCDescription = document.forms["pccForm"]["pccDescription"].value;
    if (jsonPCC.fidicPCCDescription == 0)
    {
        return false;
    }


    const url = 'http://localhost:8080/api/fidicpcc/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
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
            //alert(results);
            //window.location.reload();
            //window.console.log(results);
            window.location.assign("../html/fidicPCC.html");
        },
        function (error)
        {
            alert(error);
        }
    );

}