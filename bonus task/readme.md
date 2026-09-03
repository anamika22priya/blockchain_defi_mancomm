# Blockchain concepts implemented: 
- Blocks
- Genesis block
- Cryptographic hashing 
- SHA-256
- Nonces
- Proof of Work 
- Mining 
- Transactions 
- Pending transactions 
- Chain Validation 
- Data integrity 
- tamper detection 
## After building a basic blockchain using python i added proof of working, transaction handling, chain validation and simple cli demonstration. 
### Proof of Work: 
- Currently the block has: self.hash=self.calculate_hash()
- In proof-of-work, we introduce nonce:
- Therefore the block definition which contained : 
    - timestamp
    - data
    - previous_hash
    - hash 
    - (now has) nonce
- Every block starts with nonce=0
- We modify the calculate_hash() definition also to include nonce.
#### Add Minining function: 
- mining is the process of finding a valid hash for a block.
- the computer keeps changing: nonce value until it finds a hash with four zeroes. 

- We modify the add_block() function to add new_block.mine_block(4). 
- Now every block has to be mined before being added. 
- this completed the proof-of-work implementation.  

### Transaction handling: 
- Inside blockchain constructor: we add a pending transactions array. 
- Now the blockchain has two important things: Chain(Transactions that are already mined ) and pending_transactions (transactions waiting to be mined)
- Inside blockchain, we add an add_transaction() function. 
- we define another mine_pending_transactions() function

- Example: When Alice sends Bob Rs. 10, in a simple blockchain we make a block of it immediately. 
- In a POW blockchain, we put the transaction in pending_transactions. 
- We collect all the simialr such transactions and call mine_pending_transactions() to put them into a block and calls the mining function.
- Now the pending_transactions become empty. 

### Add Chain Validation: 
- Two checks: 
- Check 1:- If the hash values dont match
- Check 2:-Is the chain still conencted?

### Create the CLI: 

- main.py interacts wiht the user. 
- lets the user choose which blockchain operation to perform. 

# Future development: 
- The Proof-of-Work difficulty is currently fixed at 4. 
- The blockchain is stored in memeory while the program is running. 
- There is currenlty no peer-to-peer network or districbuted node system. 
- Transactions are represented using simple Python dictionaries. 


