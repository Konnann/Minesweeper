class Block {

    static isInsideMatrix(row, col, matrixSize) {
        return row >= 0 && col >= 0 && row <= matrixSize && col <= matrixSize;
    }

    static addFlag() {
        //block's 'this' must be binded to the function
        if ($(this).hasClass('marked')) {
            $(this).removeClass('marked');
            $(this).text('');
        } else {
            $(this).addClass('marked');
            $(this).text('?');

        }
    }

    static revealBlock(field, size) {
        //block's 'this' must be binded to the function
        if (!$(this).hasClass('marked')) {
            $(this).hide();
            const row = Number(this.getAttribute('row'));
            const col = Number(this.getAttribute('col'));
            Block.blockContentHandler(row, col, field, size)
        }
    }

    static  blockContentHandler(row, col, field, size) {
        let counter = 0;
        let block = $(`div[row="${row}"][col="${col}"]`);
        let revealedBlocksCount = $('#field').attr('openedBlocks');

        //check block content
        if (isBomb(row, col)) {
            $('#field').attr('minesHit', 1);

        } else if (field[row][col] == '0') {
            Block.revealAllEmptyBlocksInRange(row, col, field, size);

        } else {
            block[0].setAttribute('checked', 'true');
            $('#field').attr('openedBlocks', ++revealedBlocksCount);
        }


        function isBomb(row, col) {
            return field[row][col] == 'B';
        }

    }

    static revealAllEmptyBlocksInRange(row, col, field, size) {

        let block = $(`div[row="${row}"][col="${col}"]`);
        if (!Block.isInsideMatrix(row, col, size) || field[row][col] == 'B' || block[0].hasAttribute('checked')) {
            return ;
        }

        block[0].setAttribute('checked', 'true');
        $(block[0]).hide();
        let revealedBlocksCount = $('#field').attr('openedBlocks');
        revealedBlocksCount++;
        $('#field').attr('openedBlocks', revealedBlocksCount);

        if (field[row][col] == '0') {
            //top
            Block.revealAllEmptyBlocksInRange(row - 1, col, field, size);
            //bot
            Block.revealAllEmptyBlocksInRange(row + 1, col, field, size);
            //right
            Block.revealAllEmptyBlocksInRange(row, col + 1, field, size);
            //left
            Block.revealAllEmptyBlocksInRange(row, col - 2, field, size);
            //right + top
            Block.revealAllEmptyBlocksInRange(row - 1, col + 1, field, size);
            //left + top
            Block.revealAllEmptyBlocksInRange(row - 1, col - 1, field, size);
            //right + bot
            Block.revealAllEmptyBlocksInRange(row + 1, col + 1,  field, size);
            //left + bot
            Block.revealAllEmptyBlocksInRange(row + 1, col - 1, field, size);
        }
    }

}
