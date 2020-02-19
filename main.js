const SHA256 = require('crypto-js/sha256')

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress =toAddress;
        this.amount = amount;
    }
}

// Create a transaction , add it to array and add their hash
// order of blocks are determined by their position in the array not by index that we provide
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        // A nonce is an abbreviation for "number only used once," which is a number added to a hashed—or encrypted—block in a blockchain that, when rehashed, 
        // meets the difficulty level restrictions. The nonce is the number that blockchain miners are solving for
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce +  JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        // implementing proof-of-work mechanism
        // avoid spammer to create many block chain, security
        // length of difficulty 
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce ++;
            this.hash = this.calculateHash();

        }
        console.log("Block Mined: " + this.hash);
    }
}



class BlockChain {
    constructor() {
        //genesis block add manually
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block( "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let pratikCoin = new BlockChain();



