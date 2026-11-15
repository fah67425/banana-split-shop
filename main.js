let coins = Number(localStorage.getItem("bananacoins")) || 0;
let maxscoops = Number(localStorage.getItem("maxscoops")) || 3;
let orderreward = Number(localStorage.getItem("orderreward")) || 20;
let upgrades = JSON.parse(localStorage.getItem("shopupgrades")) || { tray: false, rewards: false };
let ownedtoppings = JSON.parse(localStorage.getItem("ownedtoppings")) || {};
let bananaprepared = false;
let icecreamadded = false;
let selectedflavours = [];
let selectedtoppings = [];
let currentorder = {};
let ordernumber = 0;

function splitbanana() {
    if (bananaprepared) {
        return;
    }

    bananaprepared = true;

    document.getElementById("banana").classList.add("split");
    document.getElementById("bananastatus").textContent = "banana: split into two halves!";
}

function addicecream(flavour) {
    if (!bananaprepared) {
        alert("split your banana first!");
        return;
    }

    if (selectedflavours.length >= maxscoops) {
        alert("maximum scoop reached! (" + maxscoops + " scoop)");
        return;
    }

    selectedflavours.push(flavour);
    icecreamadded = true;

    let scoop = document.createElement("div");

    scoop.className = "scoop " + flavour;

    document.getElementById("scoops").appendChild(scoop);

    document.getElementById("icecreamstatus").textContent = "scoops: " + selectedflavours.length;
}

function servecustomer() {
    if (!bananaprepared || selectedflavours.length === 0) {
        alert("finish preparing the banana first!");
        return;
    }
    
    let happy = compareorders();
    let status = document.getElementById("customerstatus");
 
    if (happy) {
        status.textContent = "CUSTOMER HAPPY!";
        status.className = "happy";

        coins += orderreward;

        updatecoins();
    } else {
        status.textContent = "CUSTOMER MAD!";
        status.className = "mad";
    }

    let historyitem = document.createElement("div");

    historyitem.className = "history-entry " + (happy ? "happy" : "mad");
    historyitem.textContent = "order #" + ordernumber + " | " + 
    (happy ? "CUSTOMER HAPPY!" : "CUSTOMER MAD!") + " | flavours: " + selectedflavours.join(", ") +
    " | toppings: " + (selectedtoppings.length ? selectedtoppings.join(", ") : "none");

    let historylist = document.getElementById("historylist");

    if (historylist.textContent === "NO ORDERS YET.") {
        historylist.innerHTML = "";
    }

    historylist.prepend(historyitem);

    //reset

    bananaprepared = false;
    icecreamadded = false;
    selectedflavours = [];
    selectedtoppings = [];

    document.getElementById("banana").classList.remove("split");
    document.getElementById("bananastatus").textContent = "banana: whole";
    document.getElementById("scoops").innerHTML = "";
    document.getElementById("toppings").innerHTML = "";
    document.getElementById("icecreamstatus").textContent = "ice cream: none";

    randomorders();
}

//topping logic
function addcherry() {
    addtopping("cherry","cherry");
} function addchocolatesauce() {
    addtopping("chocolate sauce","sauce");
} function addsprinkles() {
    addtopping("sprinkles","sprinkles");
} function addnuts() {
    addtopping("nuts","nutsclass");
}

function randomorders() {
    let flavours = ["vanilla","chocolate","strawberry"];
    let toppings = ["cherry","chocolate sauce"];
    //add unlocked toppings
    if (ownedtoppings["sprinkles"]) {
        toppings.push("sprinkles");
    } if (ownedtoppings["nuts"]) {
        toppings.push("nuts");
    }

    for (const x of ["sprinkles","nuts"]) {
        if (ownedtoppings[x]) toppings.push(x);
    }

    let flavourcount = Math.floor(Math.random() * 3) + 1;
    let chosenflavours = [...flavours].sort(() => Math.random() - 0.5).slice(0, flavourcount);

    let toppingcount = Math.floor(Math.random() * (toppings.length + 1));
    let chosentoppings = [...toppings].sort(() => Math.random() - 0.5).slice(0, toppingcount);

    currentorder = {
        flavours: chosenflavours,
        toppings: chosentoppings
    };

    ordernumber++;

    document.getElementById("orderdetails").innerHTML = 
        "flavours: " + chosenflavours.join(", ") + "<br>toppings: " 
        + (chosentoppings.length ? chosentoppings.join(", "): "none") +
        "<br>banana: split";
    
}

randomorders();

function compareorders() {
    let playerflavours = [...selectedflavours].sort();
    let customerflavours = [...currentorder.flavours].sort();

    let playertoppings = [...selectedtoppings].sort();
    let customertoppings = [...currentorder.toppings].sort();

    let flavourscorrect = JSON.stringify(playerflavours) === JSON.stringify(customerflavours);
    let toppingscorrect = JSON.stringify(playertoppings) === JSON.stringify(customertoppings);

    return bananaprepared && flavourscorrect && toppingscorrect;
}

function updatecoins() {
    document.getElementById("money").textContent = "coins: " + coins;
    localStorage.setItem("bananacoins", coins);

}

updatecoins();

function buytopping(name, price, buttonid) {
    if (ownedtoppings[name]) {
        return;
    }
    if (coins < price) {
        document.getElementById("shopmessage").textContent = "not enough coins! keep saving";
        return;
    }

    coins -= price;
    ownedtoppings[name] = true;
    localStorage.setItem("ownedtoppings", JSON.stringify(ownedtoppings));
    updatecoins();
    refreshshopbutton();

    document.getElementById("shopmessage").textContent = name + " unlocked!";
}

function refreshshopbutton() {
    let sprinklesbutton = document.getElementById("buysprinkles");
    let nutsbutton = document.getElementById("buynuts");

    sprinklesbutton.textContent = ownedtoppings["sprinkles"] ? "UNLOCKED!" : "BUY SPRINKLES";
    nutsbutton.textContent = ownedtoppings["nuts"] ? "UNLOCKED!" : "BUY NUTS";
}

function buyupgrade(type) {
    let price = 0;

    if (type === "tray") {
        price = 100;
    }
    if (type === "rewards") {
        price = 60;
    }
    if (upgrades[type]) {
        return;
    }
    if (coins < price) {
        document.getElementById("shopmessage").textContent = "not enough coins! keep saving";
        return;
    }

    coins -= price;
    upgrades[type] = true;

    if (type === "tray") {
        maxscoops = 4;
    }
    if (type === "rewards") {
        orderreward = 30;
    }
    
    localStorage.setItem("shopupgrades",JSON.stringify(upgrades));
    localStorage.setItem("maxscoops", maxscoops);
    localStorage.setItem("orderreward", orderreward);

    updatecoins();
    refreshupgradebutton();

    document.getElementById("shopmessage").textContent = "upgrade purchased!";
}

function refreshupgradebutton() {
    let traybutton = document.getElementById("buytray");
    let rewardbutton = document.getElementById("buyrewards");

    traybutton.textContent = upgrades.tray ? "PURCHASED!" : "BUY UPGRADE";
    rewardbutton.textContent = upgrades.rewards ? "PURCHASED!" : "BUY UPGRADE";

    traybutton.disabled = upgrades.tray;
    rewardbutton.disabled = upgrades.rewards;
}

refreshshopbutton();
refreshupgradebutton();

function addtopping(name, classname) {
    if (selectedflavours.length === 0) {
        alert("add ice cream first!");
        return;
    }
    if (name !== "cherry" && name !=="chocolate sauce" && !ownedtoppings[name]) {
        alert("buy the topping first!");
        return;
    }
    if (selectedtoppings.includes(name)) { //test
        alert("you already added this topping"); //test
        return; //test
    }
    
    selectedtoppings.push(name); 

    let topping = document.createElement("div");
    topping.className = classname;
    document.getElementById("toppings").appendChild(topping);
}

function resetgame() {
    let confirmed = confirm("are u sure? you'll lost all coins, purchases history and upgrades.");

    if (!confirmed) return;

    coins = 0;
    maxscoops = 3;
    orderreward = 20;
    upgrades = { tray: false, rewards: false };
    ownedtoppings = {};

    //clear all the localstorageeeee
    localStorage.removeItem("bananacoins");
    localStorage.removeItem("ownedtoppings");
    localStorage.removeItem("shopupgrades");
    localStorage.removeItem("maxscoops");
    localStorage.removeItem("orderreward");
    //kitchen
    selectedflavours = [];
    selectedtoppings = [];
    bananaprepared = false;

    document.getElementById("scoops").innerHTML = "";
    document.getElementById("toppings").innerHTML = "";
    document.getElementById("banana").classList.remove("split");
    document.getElementById("bananastatus").textContent = "banana: whole";
    document.getElementById("icecreamstatus").textContent = "ice cream: none";
    document.getElementById("customerstatus").className = "";
    document.getElementById("shopmessage").textContent = "game successfully reset!";

    updatecoins();
    randomorders();
    refreshshopbutton();
    refreshupgradebutton();
}

function addcoins() {
    coins = 100;
    alert("you got 100 coins!")
    updatecoins();
}