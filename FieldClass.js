class Field {

    constructor() {
        Field.field = {};
        Field.fieldSize = 0;
        Field.maxMines = 0;
        this.context = this;
    }

    createField(mines, size) {
        this.maxMines = mines;
        Field.maxMines = mines;
        this.size = size;
        Field.fieldSize = size;
        this.generatedField = new Array(this.size + 1);

        for (let i = 0; i <= this.size; i++) {
            this.generatedField[i] = new Array(this.size + 1);
        }
        let minesCount = 0;

        //fill matrix with default string value
        for (let row = 0; row <= this.size; row++) {
            for (let col = 0; col <= this.size; col++) {
                this.generatedField[row][col] = "-";
            }
        }


        //generate mines
        while (minesCount < this.maxMines) {
            const row = Math.floor((Math.random() * this.size));
            const col = Math.floor((Math.random() * this.size));
            if (this.generatedField[row][col] == "-") {
                this.generatedField[row][col] = "B";
                minesCount++;
            }
        }

        //generate numbers around bombs
        for (let row = 0; row <= this.size; row++) {
            for (let col = 0; col <= this.size; col++) {
                if (this.generatedField[row][col] == "-") {
                    let nearbyBombCounter = 0;
                    if (Block.isInsideMatrix(row - 1, col - 1, this.size)) {
                        if (this.generatedField[row - 1][col - 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row - 1, col, this.size)) {
                        if (this.generatedField[row - 1][col] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row - 1, col + 1, this.size)) {
                        if (this.generatedField[row - 1][col + 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row, col - 1, this.size)) {
                        if (this.generatedField[row][col - 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row, col + 1, this.size)) {
                        if (this.generatedField[row][col + 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row + 1, col, this.size)) {
                        if (this.generatedField[row + 1][col] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row + 1, col - 1, this.size)) {
                        if (this.generatedField[row + 1][col - 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    if (Block.isInsideMatrix(row + 1, col + 1, this.size)) {
                        if (this.generatedField[row + 1][col + 1] == "B") {
                            nearbyBombCounter++;
                        }
                    }
                    this.generatedField[row][col] = nearbyBombCounter + "";
                }
            }
        }

        Field.field = this.generatedField;

        //create html table and append it
        const table = $('<table id="content">');
        for (let row = 0; row <= this.size; row++) {
            const tr = $('<tr>');
            for (let col = 0; col <= this.size; col++) {
                const td = $('<td>');
                const div = $('<div class="block-content">');
                const text = $('<div class="text-content">');

                if (this.generatedField[row][col] == "0") {
                    text.text('');
                } else if (this.generatedField[row][col] == 'B') {
                    text.text('💣');
                    div.addClass('bomb-background');
                    text.addClass('bomb-text');
                } else {
                    text.text(`${this.generatedField[row][col]}`);
                }
                div.append(text);
                td.append(div);
                tr.append(td);
            }
            table.append(tr)
        }
        $('#field').append(table);
    }

    createCovers() {
        const table = $('<table id="cover">');
        for (let row = 0; row <= this.size; row++) {
            const tr = $('<tr>');
            for (let col = 0; col <= this.size; col++) {
                const div = $(`<div class="cover-block" row="${row}" col="${col}">`).on('mousedown', clickHandler);
                const td = $('<td>').append($('<div class="container">').append(div));
                tr.append(td);
            }
            table.append(tr);
        }
        $('#field').append(table);

        function clickHandler(e) {
            switch (e.button) {
                //left click
                case 0:
                    const reveal = Block.revealBlock.bind(this);
                    reveal(Field.field, Field.fieldSize);
                    $(document).trigger('data-attribute-changed');
                    break;
                //right click
                case 2:
                    const flag = Block.addFlag.bind(this);
                    flag();
                    break;
            }
        }
    }

}
