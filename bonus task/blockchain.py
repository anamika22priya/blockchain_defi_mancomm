import hashlib
import time
#make a class for each block and the attributes for the block.
class Block:
    def __init__(self,data,previous_hash):
        self.timestamp=time.time() #time at which the block is created
        self.data=data #the data associated with the block;
        self.previous_hash=previous_hash #the data associated with the previous block hashed.
        self.nonce =0
        self.hash=self.calculate_hash() #the data associated with the current block hashed. 
    def calculate_hash(self):
        block_string=(str(self.timestamp)+str(self.data)+str(self.previous_hash)+str(self.nonce))
        return hashlib.sha256(block_string.encode()).hexdigest() #SHA-256 hashing algorithm returns a secure hash object,which is converted into a hexadecimal text that is readable
    def mine_block(self, difficulty):
        target="0" * difficulty

        while not self.hash.startswith(target):
            self.nonce += 1
            self.hash = self.calculate_hash()

        print("Block mined!")
        print("Nonce:",self.nonce)
        print("Hash:",self.hash)
class Blockchain:
    def __init__(self):
        self.chain=[self.create_genesis_block()]#initialise the list that will hold all the individual blocks
        self.pending_transactions = []
    def create_genesis_block(self):
        return Block("Genesis Block","0")#create genesis block with data and previous hash as 0,so that the list is not empty
    def get_latest_block(self):
        return self.chain[-1]#access the last block added to the list for the previous hash
    def add_block(self,new_data):
        previous_hash=self.get_latest_block().hash #previous hash obtain
        new_block=Block(new_data,previous_hash) #creation of the new block
        new_block.mine_block(4)
        self.chain.append(new_block) # add the new block to the list
    def add_transaction(self, sender, receiver, amount):
        transaction={
            "sender":sender,
            "receiver":receiver,
            "amount":amount
        }

        self.pending_transactions.append(transaction)
    def mine_pending_transactions(self):
        if not self.pending_transactions:
            print("No transactions to mine.")
            return
        new_block=Block(self.pending_transactions,self.get_latest_block().hash)
        new_block.mine_block(4)
        self.chain.append(new_block)
        self.pending_transactions = []
    def is_chain_valid(self):
        for i in range(1, len(self.chain)):

            current_block=self.chain[i]
            previous_block=self.chain[i-1]

            #check if cuurent_block hash is correct

            if current_block.hash != current_block.calculate_hash():
                return False

            #check if current block is correctly linked
            if current_block.previous_hash != previous_block.hash:
                return False

        return True

  # testing code:          
    # my_blockchain.add_transaction("Alice", "Bob", 10)
    # my_blockchain.add_transaction("Bob", "Charlie", 5)

    # my_blockchain.mine_pending_transactions()

    # print("Blockchain valid:", my_blockchain.is_chain_valid())

    # my_blockchain.chain[1].data[0]["amount"] = 999

    # print("Blockchain valid after tampering:", my_blockchain.is_chain_valid())

    # for block in my_blockchain.chain: #print the all blocks attributes of the blocks in the blockchain
    #     print("Timestamp:", block.timestamp)
    #     print("Data:", block.data)
    #     print("Previous Hash:", block.previous_hash)
    #     print("Nonce:",block.nonce)
    #     print("Hash:", block.hash)
    #     print( )
        
