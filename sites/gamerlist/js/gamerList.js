/*    THE GAMER LIST    by Stephen Benner        using jQuery 1.9.0        NOTES:        - Birthdates are in european format (DD.MM.YYYY) because it makes sense*/var gl = (function() {    var        dbFilePaths    = {            players  : 'data/listData.xml',            comments : 'data/comments.xml'        },        xmlFormats  = { // list representation of the XML data hierarchy            players  : ['playerList', 'player', 'game', 'character'],            comments : ['commentList', 'comment']        },        players        = [],        comments    = [],        playerCount,        currGame,        valid = true, // this dictates when to highlight invalid fields        debugObj = {},                // Game data        games = {            LoL: {                name: 'League Of Legends',                fields: ['player', 'name', 'server', 'favRole', 'favHero', 'tier', 'division'],                colNames: ['Name', 'Summoner Name', 'Server', 'Fav. Role', 'Fav. Hero', 'Tier', 'Division'],                validation: ['', '@Required', '@Required', '', '', '', ''],                inputTypes: ['', 'text', '', 'text', '', '', ''],                inputMaxLen: [0, 24, 0, 12, 0, 0, 24],                colVals: ['', '',                    ['North America', 'EU West', 'EU Nordic & East', 'Brazil', 'Turkey'], '',                    ['Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Blitzcrank', 'Brand', 'Caitlyn', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gragas', 'Graves', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kennen', 'Kha\'Zix', 'Kog\'Maw', 'LeBlanc', 'Lee Sin', 'Leona', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Pantheon', 'Poppy', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Sejuani', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Taric', 'Teemo', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xerath', 'Xin Zhao', 'Yorick', 'Zed', 'Ziggs', 'Zilean', 'Zyra'],                    ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'CHALLENGER'], '']            },            BL2: {                name: 'Borderlands 2',                fields: ['player', 'profile', 'name', 'level', 'hunter'],                colNames: ['Name', 'Steam Profile', 'Character Name', 'Level', 'Vault Hunter'],                validation: ['', '@Required', '@Required', '@Required', '@Required'],                inputMaxLen: [0, 24, 24, 3, 0],                inputTypes: ['', 'text', 'text', 'number', 'text'],                colVals: ['', '', '', '', ['Axton', 'Maya', 'Salvador', 'Zero']]            },            WoW: {                name: 'World of Warcraft',                fields: ['player', 'name', 'level', 'race', 'class', 'server', 'guild'],                colNames: ['Name', 'Character Name', 'Level', 'Race', 'Class', 'Server', 'Guild'],                validation: ['','@Required','@Required','@Required','@Required','@Required',''],                inputMaxLen: [0,24,3,0,0,0,24],                inputTypes: ['','text','number','','','','text'],                colVals: ['', '', '',                    ['Draenei', 'Human', 'Dwarf', 'Night Elf', 'Gnome', 'Worgen', 'Blood Elf', 'Tauren', 'Goblin', 'Troll', 'Orc', 'Undead'],                    ['Death Knight', 'Priest', 'Druid', 'Rogue', 'Hunter', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Warrior', 'Paladin'],                    ['Aegwynn', 'Aerie Peak', 'Agamaggan', 'Aggramar', 'Akama', 'Alexstrasza', 'Alleria', 'Altar of Storms', 'Alterac Mountains', 'Aman\'Thul', 'Andorhal', 'Anetheron', 'Antonidas', 'Anub\'arak', 'Anvilmar', 'Arathor', 'Archimonde', 'Area 52', 'Argent Dawn', 'Arthas', 'Arygos', 'Auchindoun', 'Azgalor', 'Azjol-Nerub', 'Azralon', 'Azshara', 'Azuremyst', 'Baelgun', 'Balnazzar', 'Barthilas', 'Black Dragonflight', 'Blackhand', 'Blackrock', 'Blackwater Raiders', 'Blackwing Lair', 'Blade\'s Edge', 'Bladefist', 'Bleeding Hol', 'Blood Furnace', 'Bloodhoof', 'Bloodscalp', 'Bonechewer', 'Borean Tundra', 'Boulderfist', 'Bronzebeard', 'Burning Blade', 'Burning Legion', 'Caelestrasz', 'Cairne', 'Cenarion Circle', 'Cenarius', 'Cho\'gall', 'Chromaggus', 'Coilfang', 'Crushridge', 'Daggerspine', 'Dalaran', 'Dalvengyr', 'Dark Iron', 'Darkspear', 'Darrowmere', 'Dath\'Remar', 'Dawnbringer', 'Deathwing', 'Demon Soul', 'Dentarg', 'Destromath', 'Dethecus', 'Detheroc', 'Doomhammer', 'Draenor', 'Dragonblight', 'Dragonmaw', 'Drak\'Tharon', 'Drak\'thul', 'Draka', 'Drakkari', 'Dreadmaul', 'Drenden', 'Dunemaul', 'Durotan', 'Duskwood', 'Earthen Ring', 'Echo Isles', 'Eitrigg', 'Eldre\'Thalas', 'Elune', 'Emerald Dream', 'Eonar', 'Eredar', 'Executus', 'Exodar', 'Farstriders', 'Feathermoon', 'Fenris', 'Firetree', 'Fizzcrank', 'Frostmane', 'Frostmourne', 'Frostwolf', 'Galakrond', 'Gallywix', 'Garithos', 'Garona', 'Garrosh', 'Ghostlands', 'Gilneas', 'Gnomeregan', 'Goldrinn', 'Gorefiend', 'Gorgonnash', 'Greymane', 'Grizzly Hills', 'Gul\'dan', 'Gundrak', 'Gurubashi', 'Hakkar', 'Haomarush', 'Hellscream', 'Hydraxis', 'Hyjal', 'Icecrown', 'Illidan', 'Jaedenar', 'Jubei\'Thos', 'Kael\'thas', 'Kalecgos', 'Kargath', 'Kel\'Thuzad', 'Khadgar', 'Khaz Modan', 'Khaz\'goroth', 'Kil\'jaeden', 'Kilrogg', 'Kirin Tor', 'Korgath', 'Korialstrasz', 'Kul Tiras', 'Laughing Skull', 'Lethon', 'Lightbringer', 'Lightning\'s Blade', 'Lightninghoof', 'Llane', 'Lothar', 'Madoran', 'Maelstrom', 'Magtheridon', 'Maiev', 'Mal\'Ganis', 'Malfurion', 'Malorne', 'Malygos', 'Mannoroth', 'Medivh', 'Misha', 'Mok\'Nathal', 'Moon Guard', 'Moonrunner', 'Mug\'thol', 'Muradin', 'Nagrand', 'Nathrezim', 'Nazgrel', 'Nazjatar', 'Nemesis', 'Ner\'zhul', 'Nesingwary', 'Nordrassil', 'Norgannon', 'Onyxia', 'Perenolde', 'Proudmoore', 'Quel\'dorei', 'Quel\'Thalas', 'Ragnaros', 'Ravencrest', 'Ravenholdt', 'Rexxar', 'Rivendare', 'Runetotem', 'Sargeras', 'Saurfang', 'Scarlet Crusade', 'Scilla', 'Sen\'jin', 'Sentinels', 'Shadow Council', 'Shadowmoon', 'Shadowsong', 'Shandris', 'Shattered Halls', 'Shattered Hand', 'Shu\'halo', 'Silver Hand', 'Silvermoon', 'Sisters of Elune', 'Skullcrusher', 'Skywall', 'Smolderthorn', 'Spinebreaker', 'Spirestone', 'Staghelm', 'Steamwheedle Cartel', 'Stonemaul', 'Stormrage', 'Stormreaver', 'Stormscale', 'Suramar', 'Tanaris', 'Terenas', 'Terokkar', 'Thaurissan', 'The Forgotten Coast', 'The Scryers', 'The Underbog', 'The Venture Co', 'Thorium Brotherhood', 'Thrall', 'Thunderhorn', 'Thunderlord', 'Tichondrius', 'Tol Barad', 'Tortheldrin', 'Trollbane', 'Turalyon', 'Twisting Nether', 'Uldaman', 'Uldum', 'Undermine', 'Ursin', 'Uther', 'Vashj', 'Vek\'nilash', 'Velen', 'Warsong', 'Whisperwind', 'Wildhammer', 'Windrunner', 'Winterhoof', 'Wyrmrest Accord', 'Ysera', 'Ysondre', 'Zangarmarsh', 'Zul\'jin', 'Zuluhed'],'']            },            SC2: {                name: 'Starcraft 2',                fields: ['player', 'battleTag', 'ones', 'twos', 'threes', 'favRace'],                colNames: ['Name', 'Battle tag', '1v1 Rank', '2v2 Rank', '3v3 Rank', 'Favorite Race'],                validation: ['','@Required','','','',''],                inputMaxLen: [0,24,4,4,4,0],                inputTypes: ['','text','number','number','number',''],                colVals: ['', '', '', '', '', ['Terran', 'Zerg', 'Protoss']]            },            D3: {                name: 'Diablo 3',                fields: ['player', 'battleTag', 'name', 'level', 'class', 'server'],                colNames: ['Name', 'Battle Tag', 'Character Name', 'Level', 'Class', 'Server'],                validation: ['', '@Required', '@Required', '@Required', '@Required', '@Required'],                inputMaxLen: [0, 24, 24, 3, 0, 0],                inputTypes: ['', 'text', 'text', 'number', '', '', ''],                colVals: ['', '', '', '', ['Barbarian', 'Demon Hunter', 'Monk', 'Witch Doctor', 'Wizard'], ['Americas', 'Europe', 'Asia']]            },            Steam: {                name: 'Steam',                fields: ['player', 'profile', 'games'],                colNames: ['Name', 'Profile Name', 'Games You Play'],                validation: ['','@Required',''],                inputMaxLen: [0,24,255],                inputTypes: ['','text','text'],                colVals: ['', '', '']            },            BO2: {                name: 'Call of Duty Black Ops 2',                fields: ['player', 'steamProfile', 'level', 'prestige', 'favWeaponClass'],                colNames: ['Name', 'Profile Name', 'Level', 'Prestige', 'Fav. Weapon Class'],                validation: ['','@Required','@Required','@Required',''],                inputMaxLen: [0,24,2,2,0],                inputTypes: ['','text','number','number',''],                colVals: ['', '', '','',['SMG','LMG','Assault','Sniper','Shotgun']]            }        };        // end of variables        // This ensures data is loaded before displaying and/or saving to database    $.ajaxSetup({async: false});        // Load player data    $.ajax({        type: 'GET',        url: dbFilePaths.players,        dataType: 'xml',           async: false,        success: parsePlayerList    });    // Load comment data    $.ajax({        type: 'GET',        url: dbFilePaths.comments,        dataType: 'xml',           async: false,        success: parseCommentData    });        // DEBUGGING    window.submit = function(email, name) {        currGame = 'WoW';        console.log(postData('updateDB.php', {            'email'        : 'test@test.com',            'name'        : 'test user',            'char'        : {                'name'   : 'wowChar',                'level'  : '85',                'race'   : 'nightelf',                'class'  : 'hunter',                'server' : 'testServer'            },            'game'        : currGame,            'gameName'  : games[currGame].name,            'dbFile'    : dbFilePaths.players,            'xmlFormat' : xmlFormats.players        }));    };        // WEBSITE DYNAMIC CONTENT GENERATION        // For each game, create a DIV to hold the list of players    var targetElem = $('.gamesNav');    for (var k in games) {        targetElem = $('<div class="playerListArea ' + k + '"></div>').insertAfter(targetElem);    }        // For each player, create a row of HTML tags specified by the 'tag' variable    var tag = 'p';    // header row    for (var g in games) {        var $newPlayerRow = $('<div class="header row"></div>');        var $row = [];        for (var i = 0; i < games[g].colNames.length; i++) {            $row.push(htmlElem(tag,{                'class':games[g].fields[i]+' selectDisabled',                'unselectable':'on'            },games[g].colNames[i]));        }        $newPlayerRow.append($row).appendTo($('.playerListArea[class~="' + g + '"]'));    }    // player rows    for (var i = 0; i < players.length; i++) {        for (var j = 0; j < players[i].games.length; j++) {            var g = players[i].games[j];            // the loop creating concatenated HTML from object properties relies upon the jQuery function            // 'append', which may take an array of objects as its parameter.            for (var k = 0; k < g.chars.length; k++) {                var $newPlayerRow = $('<div class="row"></div>');                var $row = [];                $row.push(htmlElem(tag,{'class':'player'},players[i].name));                for (v in g.chars[k]) {                    $row.push(htmlElem(tag,{'class':v}, g.chars[k][v]));                }                $newPlayerRow.append($row).appendTo($('.playerListArea[class~="' + g.id + '"]'));            }        }    }        // Generate comments    insertComments($('.commentList'));        // Generate add-user forms    // NOTE - redundant 'regula-validation' classes present... ick..    var defaultSelectText = '';    for (var g in games) {        var formElems = [];        var currGameForm = $('<form class="charForm ' + g + '" autocomplete="on"></form>');        $('.charFormArea').append(currGameForm);        for (var v = 1; v < games[g].fields.length; v++) {            var $row = $('<div class="formRow"></div>');            // LABEL            $row.append(htmlElem('label',{                'class' : g + '_' + games[g].fields[v] + ' regula-validation',                'type'  : 'text',                'for'   : g + '_' + games[g].fields[v]            }, games[g].colNames[v])); //content            // INPUT,SELECT            var span = $('<span></span>');            // When no values exist for this element, it is an INPUT            if (games[g].colVals[v] === '') {                span.append(htmlElem('input',{                    'id'    : g + '_' + games[g].fields[v],                    'class' : g + '_' + games[g].fields[v] + ' regula-validation',                    'type'  : games[g].inputTypes[v],                    'maxlength' : (games[g].inputMaxLen[v] !== 0) ? games[g].inputMaxLen[v] : 255,                    'data-constraints' : games[g].validation[v]                }));            } else {                var select = htmlElem('select',{                    'id'    : g + '_' + games[g].fields[v],                    'class' : g + '_' + games[g].fields[v] + ' regula-validation',                    'data-constraints' : games[g].validation[v]                });                select.append($('<option>' + defaultSelectText + '</option>'));                for (var i = 0; i < games[g].colVals[v].length; i++) {                    select.append(htmlElem('option', {                        'value' : games[g].colVals[v][i]                    }, games[g].colVals[v][i]));                }                span.append(select);            }            formElems.push($row.append(span));        }        formElems.push(htmlElem('div',{            'id'    : g + '_Submit',            'class' : 'addCharSubmit'        }, 'SUBMIT'));        currGameForm.append(formElems);    }        // MISC INIT OPERATIONS        // Clear fields    $('INPUT, SELECT, TEXTAREA').val('');    // Sprinkle some extra CSS on top    $('.charForm.Steam >:eq(1), .charForm.BL2 >:eq(0), .charForm.BL2 >:eq(1)').addClass('centered') // steam game list        // FORM VALIDATION (via Regula)    regula.bind();    $('.popupWindow *[data-constraints]').change(function() {        var validationResults = $('.popupWindow *:visible[data-constraints]').regula('validate');        $('.popupWindow *:visible[data-constraints]').removeClass('invalidField');        if (validationResults.length === 0) {            $('.addCharSubmit:visible[id*="' + currGame + '"]').addClass('submitEnabled');        } else {            // highlight invalid fields            if (valid === false) {                for (var r in validationResults) {                    $('#' + validationResults[r].failingElements[0].id).addClass('invalidField');                }            }            $('.addCharSubmit[id*="' + currGame + '"]').removeClass('submitEnabled');        }    });    $('#addComment').change(function() {        if (($(this).val() !== $(this).attr('placeholder')) && ($(this).val() !== '')) {            $('#commentSubmit').addClass('submitCommentEnabled');        } else {            $('#commentSubmit').removeClass('submitCommentEnabled');        }    });        // EVENTS        // Update character info//    $('.row:not(:first-of-type)').click(function() {//        if ($('.popupWrapper').css('display') === 'none') {//            $('.popupWrapper').fadeIn('600', 'swing');//            $('.gameListButton .gameButton').removeClass('buttonShowHide'); // don't ask me why this is necessary, probably something to do with 'addClass' toggling instead of just adding a class//            $('.gameListButton .gameButton').addClass('buttonShowHide');//            $('.gameListButton .gameButton:first-of-type').toggleClass('buttonShowHide');//            $('.gameListButton').toggleClass('listShowHide');//            $('.popupContent P').show();//        }//    });        // Add a character to the gamer list    $('.addCharSubmit').click(function() {        if ($(this).hasClass('submitEnabled')) {            addCharToDB();                         // save form data            var reloadDelay = 0;                               /* if ($('#' + currGame + '_SOUND')[0]) { // play game sound                reloadDelay = 2000;                // wait this many milliseconds                $('#' + currGame + '_SOUND')[0].play();            }*/            closePopupWindow();            if ($('.playerListArea[class~="' + currGame + '"]').attr('display') === 'none') {                $('.gamesNav .gameButton[class~="' + currGame + '"]').trigger('click');            }        } else { // validate using Regula (right now this is shit haha)            var validationResults = $('.popupWindow *:visible[data-constraints]').regula('validate');            // highlight invalid fields            $('.popupWindow *:visible[data-constraints]').removeClass('invalidField');            for (var r in validationResults) {                $('#' + validationResults[r].failingElements[0].id).addClass('invalidField');            }            valid = false;        }    });        // Add comment    $('#commentSubmit').click(function() {        if ($(this).hasClass('submitCommentEnabled')) {            addCommentToDB(                $('#addComment').val(),                $('#commentAuthorName').val()            );            // pass newly-added comment to display function            // NOTE: here would be a good place to pass custom animate params            insertComments($('.commentList'),[comments[comments.length-1]]);            $(this).removeClass('submitCommentEnabled');            $('#addComment','#commentAuthorName').val($(this).attr('placeholder'));        }    });        // Table column sorting (using Tinysort)    $('.row.header > P').click(function() {        // first, determine which column we are sorting        var field;        for (f in games[currGame].fields) {            if ($(this).hasClass(games[currGame].fields[f])) {                field = games[currGame].fields[f];            }        }        // toggle ascending/descending order        var oldOrdering = $(this).hasClass('desc') ? 'desc' : 'asc';        var newOrdering = oldOrdering === 'desc' ? 'asc' : 'desc';        $(this).removeClass(oldOrdering);        $('.playerListArea[class~="' + currGame + '"] .row[class="row"]').tsort(            'P.' + field,{                order : newOrdering            });        $(this).addClass(newOrdering);    });        // Voting arrows - update rank on click    $('.comment').hover(function() {        if (!$(this).hasClass('voted')) { // only show arrows if votable            $(this).find('.commentHeader').append(htmlElem('div',{'class':'voteArrows' }).append(                htmlElem('div',{'class':'arrowUp'}).append(                    htmlElem('div',{'class':'triangle'}).after(                    htmlElem('div',{'class':'square'}))).after(                htmlElem('div',{'class':'arrowDown'}).append(                    htmlElem('div',{'class':'square'}).after(                    htmlElem('div',{'class':'triangle'}))))));            var c = $(this);                        // reference to current comment            $('.voteArrows > *').click(function() { // arrow click event                var cid = parseInt(c.attr('id'));   // extract comment ID                if ($(this).hasClass('arrowUp')) {  // store new rank value                    comments[cid].rank++;                    postData('updateRank.php', {cid:cid, rank:'up', dbFile:dbFilePaths.comments});                } else {                    comments[cid].rank--;                    postData('updateRank.php', {cid:cid, rank:'down', dbFile:dbFilePaths.comments});                }                if (comments[cid].rank > 0) {       // put a + or - sign before comment rank                    c.find('.commentRank').text('+' + comments[cid].rank);                } else { c.find('.commentRank').text(comments[cid].rank); }                c.addClass('voted');                // only one vote per comment                $('.voteArrows').detach();          // hide the vote arrows            });        }    }, (function() {        $('.voteArrows').detach();    }));        // Toggle elements with HTML5 'placeholder' text when clicked - awwwww yea!    $('[placeholder]').each(function() {        var defaultText = $(this).attr('placeholder');        $(this).focus(function() {            if ($(this).attr('placeholder') === defaultText) {                $(this).attr('placeholder','');                $(this).val = '';            }        }).blur(function() {            $(this).attr('placeholder',defaultText);        });    });        // Toggle add-character form on selection of game button from drop-down list    // NOTE - this could be improved a lot if I got rid of pure CSS animations...    $('.gameListButton > .gameButton').click(function() {        $('.gameListButton').hide(); // get the drop-down list out of the way        $('.popupContent P').hide(); // hide default popup-window text        $('.charForm').hide();       // hide any visible forms        for (var g in games) {       // identify which game was selected            if ($(this).hasClass(g)) {                currGame = g;                $('.charForm.' + g).show();                                    // reveal selected game form                $('.gameListButton > .gameButton').addClass('buttonShowHide'); // hide button list                $(this).toggleClass('buttonShowHide');                         // display button for this game            }        }    }).mouseout(function() { $('.gameListButton').show(); });                  // reveal hidden button list            // Open popup window    $('.signupButton').click(function() {        if ($('.popupWrapper').css('display') === 'none') {            $('.popupWrapper').fadeIn('600','swing');            $('.gameListButton .gameButton').removeClass('buttonShowHide'); // don't ask me why this is necessary, probably something to do with 'addClass' toggling instead of just adding a class            $('.gameListButton .gameButton').addClass('buttonShowHide');            $('.gameListButton .gameButton:first-of-type').toggleClass('buttonShowHide');            $('.gameListButton').toggleClass('listShowHide');            $('.popupContent P').show();        }    });        // Close popup window    $('.exitButton').click(closePopupWindow);    $(document).keyup(function(e) {        if (e.keyCode === 27) { closePopupWindow(); }    });        // Toggle player list display (animated with jQuery)       $('.gamesNav > .gameButton').click(function() {        for (g in games) {            if ($(this).hasClass(g)) {                if ($('.playerListArea' + '.' + g).is(':hidden')) {                    $('.playerListArea:visible').slideUp(600,'easeOutExpo');                    $('.playerListArea' + '.' + g).slideDown(600,'easeOutExpo');                } else { $('.playerListArea' + '.' + g).slideUp(600,'easeOutExpo'); }                currGame = g;            }        }    });                // METHODS        /**     * Creates and display HTML containing list of comments (ordered last to first)     *     * @param 'container'   The HTML element which will store the comments     * @param 'commentList' Optional list of objects containing comment data to insert     */    function insertComments(container, commentList) {        commentList = commentList || comments;              // if no comments given, default to using internal database        for (var i = commentList.length-1; i > (-1); i--) { // append comments in reverse order (newest first)            var popularity = '';                            // style comments based on rank            var r = commentList[i].rank;            if (r > 0) {                              if (r > 100)             { popularity = 'onFire'; }                if (r >= 50 && r < 100)  { popularity = 'hot'; }                if (r > 25 && r < 50)    { popularity = 'popular'; }            } else {                                                        if (r < 0 && r >= -10)   { popularity = 'unpopular'; }                 if (r < -10 && r >= -25) { popularity = 'spam'; }                if (r < -25)             { popularity = 'troll'; }            }                                                           var $comment = htmlElem('div',{                                 'id'    : commentList[i].id,                                  'class' : 'comment' + ' ' + popularity             });                                                         var rankVal = '';                                           if (commentList[i].rank > 0) {                  // insert + or - sign before comment rank                rankVal = '+' + commentList[i].rank;            } else { rankVal = commentList[i].rank; }            $comment.append(                htmlElem('div',{'class':'commentHeader'}).append(                        // header DIV                    htmlElem('p',{'class':'commentAuthor'},commentList[i].author).after( // author                    htmlElem('p',{'class':'commentDate'},commentList[i].date).after(     // date                    htmlElem('p',{'class':'commentRank'},rankVal)))));                   // rank            $comment.append(htmlElem('p',{'class':'commentText'},commentList[i].text));  // text            (commentList.length === 1) ? $comment.prependTo(container).hide().slideDown() : container.append($comment);        }    }        /**     * Sends updated form data to PHP file to write to database, as well as     * updating HTML row into the DOM to display updated information     *     * @return {boolean} Success status     */    function modifyCharData() {        // update html here        var charData = {            email      : $('#userEmail').val(),            name      : $('#userName').val(),            char      : newCharObj,            game      : currGame,            gameName  : games[currGame].name,            mode      : update,            dbFile      : dbFilePaths.players,            xmlFormat : xmlFormats.players        };        return postData('updateDB.php', charData);    }        /**     * Sends character form data to PHP file to write to database, as well as     * injecting an HTML row into the DOM to display updated information     *     * @return {boolean} Success status     */    function addCharToDB() {        var newCharObj = {};        var $newPlayerRow = $('<div class="row"></div>');        var $row = [];        $row.push(htmlElem(tag,{'class':'player'},$('#userName').val()));        for (var i = 1; i < games[currGame].fields.length; i++) {            newCharObj[games[currGame].fields[i]] = $('SPAN .' + currGame + '_' + games[currGame].fields[i]).val();            $row.push(htmlElem(tag,{'class':games[currGame].fields[i]}, newCharObj[games[currGame].fields[i]]));        }        $newPlayerRow.append($row).appendTo($('.playerListArea[class~="' + currGame + '"]'));        var charData = {            email      : $('#userEmail').val(),            name      : $('#userName').val(),            char      : newCharObj,            game      : currGame,            gameName  : games[currGame].name,            mode      : append,            dbFile      : dbFilePaths.players,            xmlFormat : xmlFormats.players        };        return postData('updateDB.php', charData);    }        /**     * Sends comment data to PHP file to write to database     *     * @return {boolean} Success status     */    function addCommentToDB(text, author) {        if (($('#commentAuthorName').val() === '') || ($('#commentAuthorName').val() === $('#commentAuthorName').attr('placeholder'))) {            var author = 'Anonymous';        } else {            var author = $('#commentAuthorName').val();        }        comments.push({            author    : author,            text      : $('#addComment').val(),            dbFile    : dbFilePaths.comments,            xmlFormat : xmlFormats.comments        });        return postData('updateComments.php', comments[comments.length-1]);    }        /**     * Parses in player list data (XML) by traversing with jQuery     *     * @param data A jqXHR object containing results of an AJAX request     */    function parsePlayerList(data) {        $(data).find('player').each(function(i) {            // create objects with properties corresponding to their XML node attributes            /*                Note:                I played around here for a while with an alternate technique for parsing the XML into my javascript object array... I first tried to serialize the DOM nodes returned by the jQuery matches, extract their properties, and pass them as a list of arguments to an object prototype which then constructed objets for the array. It was very elegant (read: concise) but I didn't get it to work exactly right. I didn't explore this fully, but in the future I might try looking into 'JSON.stringify()' or 'JSON.parse()' to accomplish this.            */            players[i] = {};            $.each(this.attributes, function(index,attr) {                players[i][attr.name] = attr.value;            });            players[i].games = [];            $(this).find('game').each(function(j) {                players[i].games[j] = {};                $.each(this.attributes, function(index,attr){                    players[i].games[j][attr.name] = attr.value;                });                players[i].games[j].games = {};                players[i].games[j].chars = [];                /*                        Note: this particular task drove me NUTS, because it was not made intuitive that the jQuery 'ajax' function does not actually return an XML result as per normal Javascript. It in fact returns a jQuery object, which cannot be traversed via javascript commands normally used with XML. Rather, it requires one to use jQuery traversal functions such as 'children' and 'each'. Below, the first usage is of 'this' is actually accessing an XML node within the currently matched jQuery object, and the usage of '$(this)' is accessing the matched element itself, not the XML node. Confusing...                */                $(this).find('character').each(function(k) {                    players[i].games[j].chars[k] = {};                    $(this).children().each(function(l) {                        var key = this.nodeName;                        players[i].games[j].chars[k][key] = $(this).text();                    });                });            });        });        playerCount = players.length; // update player count    }        /**     * Parse in comment list data (XML) by tranversing with jQuery     *      * @param data A jqXHR object containing results of an AJAX request     */    function parseCommentData(data) {        if (comments.length > 0) { comments = []; } // reset internal database        $(data).find('comment').each(function(i) {            comments[i] = {};            $.each(this.attributes, function(index,attr) {                comments[i][attr.name] = attr.value;            });            comments[i].text = $(this).text();        });    }        /**     * Posts form data to PHP file to write to server     *     * @param file URL path of file to POST to     * @param data Data to POST     */    function postData(file, data) {        $.post(file, data, function(response) {                if (response) {                    if (response.error) {                        alert('Error: ' + response.msg);                        return false;                    }                    else {                        console.log('data sent to server: %o', data);                        console.log('server response: %o', response.msg);                        return true;                    }                } else {                    alert('Error: no reponse from server');                    return false;                }        }, 'json');    }        /**     * Creates and returns a single HTML element (as a jQuery object)     *     * @param tag     {string} HTML tag     * @param attr    {object} A hash containing HTML attribute name/value pairs     * @param content {string} Content placed directly inside HTML element     */    function htmlElem(tag, attr, content) {        tag = tag || 'div'; attr = attr || ''; content = content || ''; // defaults        var htmlString = '<' + tag        for (var a in attr) {            // only add the data-constraints attribute if not empty (ugly hack)            if (attr[a] !== '') { htmlString += (' ' + a + '="' + attr[a] + '"'); }        }        return $(htmlString += ('>' + content + '</' + tag + '>'));    }        /**     * Closes popup window and resets forms     */    function closePopupWindow() {        if ($('.popupWrapper').css('display') !== 'none') {            $('.popupWrapper').fadeOut('600','swing');            $('.charForm').hide();            // $('INPUT').val('');            $('[class~="invalidField"]').removeClass('invalidField');            $('.addCharSubmit').removeClass('submitEnabled');            valid = true;        }    }        // Ad-hoc method of revealing gamerList data to global scope    return {        // variables        dbFilePaths  : dbFilePaths,        xmlFormats   : xmlFormats,        players      : players,        comments     : comments,        playerCount  : playerCount,        currGame     : currGame,        games        : games,        // methods        addCharToDB  : addCharToDB,        htmlElem     : htmlElem,        insertComments : insertComments,        parseCommentData : parseCommentData    }}());