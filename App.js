class App {

    static initializeGame(){
        App.wins = 0;
        App.losses = 0;
        App.restart();
    }

    static restart() {
        let field = new Field();
        field.createField(10, 9);
        field.createCovers();
        App.listener = $(document).on('data-attribute-changed', App.isGameOver.bind(field.context));
    }

    static isGameOver() {

        let size = Field.fieldSize + 1;
        let allSafeBlocks = (size * size) - Field.maxMines;
        let ctx = this;


        //End-game conditions
        if ($('#field').attr('openedBlocks') == allSafeBlocks) {
            App.wins++;
            $('.cover-block').off();
            setTimeout(App.gameWon, 300);
            return true;

        } else if ($('#field').attr('minesHit') > 0) {
            App.losses++;
            $('.cover-block').off();
            setTimeout(App.gameLost, 300);
            return true;
        }
        return false;
    }

    static gameWon() {
        $('#result').css('color', 'green');
        $('#wins').text(`Wins: ${App.wins}`);

        let message = $('<div id="resultBackground">');
        $(message).append(($('<div id="resultContent">').text('You win'))).append($('<button id="restart">').text('Restart').on('click', function () {
            $(this).prop('disabled', true);
            App.resetGame();
        }));
        $('#result').append(message);
    }

    static gameLost() {
        $('#result').css('color', 'red');
        $('#losses').text(`Losses: ${App.losses}`);

        let message = $('<div id="resultBackground">');
        $(message).append(($('<div id="resultContent">').text('You lose'))).append($('<button id="restart">').text('Restart').on('click', function () {
            $(this).prop('disabled', true);
            App.resetGame();
        }));
        $('#result').append(message);
    }

    static resetGame() {
        $('#field').empty();
        $('#field').attr('minesHit', 0);
        $('#field').attr('openedBlocks', 0);
        $('#result').empty();
        App.deleteDataChangeListener();
        App.restart();
    }

    static deleteDataChangeListener() {
         App.listener.off();
    }

}


