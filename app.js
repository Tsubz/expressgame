var express = require('express');
var exphbs  = require('express-handlebars');

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('files'));

var listChoices = ["rock","paper","scissors"];
function randomPick(){
    return listChoices[parseInt(Math.random()*3)];
}

var hist = [];

function confrontation(server, player){
    if(server==="rock"){
        if(player === "rock"){
            return "It's a draw, we both picker rock.";
        }else if(player === "paper"){
            return "You win, I picked rock.";
        }else if(player==="scissors"){
            return "You are a big looser, I picked rock.";
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }else if(server==="paper"){
        if(player === "rock"){
            return "You are a big looser, I picked paper.";
        }else if(player === "paper"){
            return "It's a draw, we both picker paper.";
        }else if(player==="scissors"){
            return "You win, I picked paper.";
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }else {
        if(player === "rock"){
            return "You win, I picked scissors.";           
        }else if(player === "paper"){
            return "You are a big looser, I picked scissors.";
        }else if(player==="scissors"){
            return "It's a draw, we both picker scissors.";
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }
}


function recordHist(server, player){
    if(server==="rock"){
        if(player === "rock"){
            hist.push(["rock", "rock", "Draw"]);
        }else if(player === "paper"){
            hist.push(["rock", "paper", "Player"]);
        }else if(player==="scissors"){
            hist.push(["rock", "scissors", "Server"]);
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }else if(server==="paper"){
        if(player === "rock"){
            hist.push(["paper", "rock", "Server"]);            
        }else if(player === "paper"){
            hist.push(["paper", "paper", "Draw"]);
        }else if(player==="scissors"){
            hist.push(["paper", "scissors", "Player"]);
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }else {
        if(player === "rock"){
            hist.push(["scissors", "rock", "Player"]);     
        }else if(player === "paper"){
            hist.push(["scissors", "paper", "Server"]);
        }else if(player==="scissors"){
            hist.push(["scissors", "scissors", "Draw"]);
        } else {
            return "You are a cheater, " + player + " is not allowed.";
        }
    }
    /*
    var tableHtml = "<table border='1'>";
 
for (var i = 0; i < hist.length; i++) {
   tableHtml += "<tr><td>"+hist[i][1]+"</td></tr>";
}
    
    tableHtml += "</table>";
*/
    return hist;
}

app.get('/', function (req, res) {
    res.render('home',{userName:"Marc-Antoine"});
});

app.get('/game', function (req, res) {
    res.render('game',{userName:"Marc-Antoine", gameHistory:hist});
});

app.get('/help', function (req, res) {
    res.render('help',{userName:"Marc-Antoine"});
});

app.get('/history', function (req, res) {
    res.render('history',{userName:"Marc-Antoine", gameHistory:hist});
});

app.get('/game/:playerchoice/', function (req, res) {
    var serverPick = randomPick(),
        playerPick = req.params.playerchoice;

    res.render("game",{
        serverChoice: serverPick,
        playerChoice : playerPick,
        gameResult:confrontation(serverPick,playerPick),
        gameHistory:recordHist(serverPick,playerPick),
    });
    
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})