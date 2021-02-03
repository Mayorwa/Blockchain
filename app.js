const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor(){
        this.chain = [BlockChain.createGenesisBlock()];
    }

    static createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let afroCoin = new BlockChain();
//create Block
afroCoin.addBlock(new Block(1, "10/08/2021", { amount:4}));
afroCoin.addBlock(new Block(2, "13/08/2021", { amount:10}));

//verify blocks
console.log("is blockchain valid?" + afroCoin.isChainValid());

afroCoin.chain[1].data = {amount: 200};
afroCoin.chain[1].hash = afroCoin.chain[1].calculateHash();
afroCoin.chain[2].previousHash = afroCoin.chain[1].hash;
afroCoin.chain[2].hash = afroCoin.chain[2].calculateHash();

console.log("is blockchain valid?" + afroCoin.isChainValid());
// console.log(JSON.stringify(afroCoin, null, 4));
