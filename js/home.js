let locationPathName = location.pathname;
let patNameArray = locationPathName.split("/");

let projectElement = document.getElementById("projectId");
projectElement.addEventListener("click",projectClicked,true);
projectElement.addEventListener("mouseover",projectMouseOver,true);
projectElement.addEventListener("mouseout",projectMouseOut,true);

let claimElement = document.getElementById("claimId");
claimElement.addEventListener("click",claimClicked,true);
claimElement.addEventListener("mouseover",claimMouseOver,true);
claimElement.addEventListener("mouseout",claimMouseOut,true);

let pccElement = document.getElementById("fidicPCCId");
pccElement.addEventListener("click",pccClicked,true);
pccElement.addEventListener("mouseover",pccMouseOver,true);
pccElement.addEventListener("mouseout",pccMouseOut,true);

let gccElement = document.getElementById("fidicGCCId");
gccElement.addEventListener("click",gccClicked,true);
gccElement.addEventListener("mouseover",gccMouseOver,true);
gccElement.addEventListener("mouseout",gccMouseOut,true);

let dashBoardElement = document.getElementById("dashBoardId");
dashBoardElement.addEventListener("click",dashBoardClicked,true);
dashBoardElement.addEventListener("mouseover",dashBoardMouseOver,true);
dashBoardElement.addEventListener("mouseout",dashBoardMouseOut,true);

if (patNameArray[3]=="home.html")
{
    displayProjectsCount().then(
        function (results)
        {
            document.getElementById("totalProjectsValue").innerHTML=results.countValue;
        }, // doesn't run
        function (error)
        {
            alert(error);
        }
    );

    displayClaimsCount().then(
        function (results)
        {
            document.getElementById("totalClaimsValue").innerHTML=results.countValue;
        }, // doesn't run
        function (error)
        {
            alert(error);
        }
    );
}





function projectMouseOver()
{
    projectElement.style.background="#FBEEE6";
}

function projectMouseOut()
{

    let cn = projectElement.className;
    if (cn == "active")
    {
        projectElement.style.background="#EAFAF1";
    }
    else
    {
        projectElement.style.background="none";
    }
}

function projectClicked()
{
    window.location.assign("project.html");
}

function claimMouseOver()
{
    claimElement.style.background="#FBEEE6";
}

function claimMouseOut()
{
    let cn = claimElement.className;
    if (cn == "active")
    {
        claimElement.style.background="#EAFAF1";
    }
    else
    {
        claimElement.style.background="none";
    }
}

function claimClicked()
{
    window.location.assign("claim.html");
}

function pccMouseOver()
{
    pccElement.style.background="#FBEEE6";
}

function pccMouseOut()
{
    let cn = pccElement.className;
    if (cn == "active")
    {
        pccElement.style.background="#EAFAF1";
    }
    else
    {
        pccElement.style.background="none";
    }
}

function pccClicked()
{
    window.location.assign("fidicPCC.html");
}

function gccMouseOver()
{
    gccElement.style.background="#FBEEE6";
}

function gccMouseOut()
{
    let cn = gccElement.className;
    if (cn == "active")
    {
        gccElement.style.background="#EAFAF1";
    }
    else
    {
        gccElement.style.background="none";
    }
}

function gccClicked()
{
    window.location.assign("fidicGCC.html");
}

function dashBoardMouseOver()
{
    dashBoardElement.style.background="#FBEEE6";
}

function dashBoardMouseOut()
{
    let cn = dashBoardElement.className;
    if (cn == "active")
    {
        dashBoardElement.style.background="#EAFAF1";
    }
    else
    {
        dashBoardElement.style.background="none";
    }
}

function dashBoardClicked()
{
    window.location.assign("home.html");
}


async function displayProjectsCount()
{
    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/project/getProjectsCount';
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

async function displayClaimsCount()
{
    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/claim/getClaimsCount';
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




