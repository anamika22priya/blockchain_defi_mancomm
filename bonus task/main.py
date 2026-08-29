from blockchain import Blockchain

my_blockchain = Blockchain()

while True:

    print("\n========== SIMPLE BLOCKCHAIN ==========")
    print("1. Add transaction")
    print("2. Mine pending transactions")
    print("3. View blockchain")
    print("4. Validate blockchain")
    print("5. Test Tampering")
    print("6. Exit")
    print("=======================================")

    choice = input("Enter your choice: ")

    # 1. Add transaction
    if choice == "1":

        sender = input("Enter sender: ")
        receiver = input("Enter receiver: ")
        amount = float(input("Enter amount: "))

        my_blockchain.add_transaction(sender, receiver, amount)

        print("\nTransaction added successfully!")

    # 2. Mine transactions
    elif choice == "2":

        my_blockchain.mine_pending_transactions()

    # 3. View blockchain
    elif choice == "3":

        print("\n========== BLOCKCHAIN ==========")

        for i, block in enumerate(my_blockchain.chain):

            print("\nBlock", i)
            print("Timestamp:", block.timestamp)
            print("Data:", block.data)
            print("Previous Hash:", block.previous_hash)
            print("Nonce:", block.nonce)
            print("Hash:", block.hash)

        print("\n================================")

    # 4. Validate blockchain
    elif choice == "4":

        if my_blockchain.is_chain_valid():
            print("\nBlockchain is VALID.")
        else:
            print("\nBlockchain is INVALID!")

    # 5. Test tampering
    elif choice == "5":

        if len(my_blockchain.chain) < 2:

            print("\nYou need to mine at least one block first.")

        else:

            print("\n========== TAMPERING TEST ==========")

            # Show available blocks
            print("\nAvailable blocks:")

            for i in range(1, len(my_blockchain.chain)):
                print("Block", i)

            block_number = int(
                input("\nEnter the block number you want to tamper with: ")
            )

            if block_number <= 0 or block_number >= len(my_blockchain.chain):

                print("Invalid block number.")

            else:

                block = my_blockchain.chain[block_number]

                print("\nTransactions in Block", block_number)

                for i, transaction in enumerate(block.data):

                    print(
                        i,
                        ":",
                        transaction["sender"],
                        "->",
                        transaction["receiver"],
                        ":",
                        transaction["amount"]
                    )

                transaction_number = int(
                    input(
                        "\nEnter the transaction number you want to modify: "
                    )
                )

                if (
                    transaction_number < 0
                    or transaction_number >= len(block.data)
                ):

                    print("Invalid transaction number.")

                else:

                    transaction = block.data[transaction_number]

                    print("\nWhat do you want to modify?")
                    print("1. Sender")
                    print("2. Receiver")
                    print("3. Amount")

                    field_choice = input("Enter your choice: ")

                    if field_choice == "1":

                        new_value = input("Enter the new sender: ")
                        transaction["sender"] = new_value

                    elif field_choice == "2":

                        new_value = input("Enter the new receiver: ")
                        transaction["receiver"] = new_value

                    elif field_choice == "3":

                        new_value = float(
                            input("Enter the new amount: ")
                        )
                        transaction["amount"] = new_value

                    else:

                        print("Invalid choice.")
                        continue

                    print("\nTransaction modified!")

                    if my_blockchain.is_chain_valid():
                        print("Blockchain is VALID.")
                    else:
                        print("Blockchain is INVALID!")

    # 6. Exit
    elif choice == "6":

        print("\nExiting blockchain...")
        break

    # Invalid option
    else:

        print("\nInvalid choice. Please try again.")