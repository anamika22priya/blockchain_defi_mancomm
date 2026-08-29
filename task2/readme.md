# Game that teaches the basics of blockchain validation

# GWEI TOLL MANAGER: Build. Validate. Survive the congestion

## Progression: 
0. The validator starts with:
 🚧 1 Toll Booth
 💰 1.00 ETH
 ⭐ Validator Reputation: 100
 🚗 1 Processing Lane

1. Inspect the incoming cars: Each car then presents its information- 
    - Cars arrive at the toll booth carrying transactions.
    - Each car displays:
        - Sender
        - Receiver
        - Amount
        - Transaction Type
        - Gas Required
        - Base Fee
        - Priority Fee
        - Verification Rules: Accept or Reject based 
        - Signature valid? (the signature history is shown, alice signed for this much amount, compare that amount to current amount, if not same, then invalid)
        - Sender has sufficient balance? (the player needs to look at the gas required  and the amount being sent, sum it up and comapre, if not enough, then invalid )
        - Transaction follows contract rules? (on the top the contract rules pop up, allowed senders and allowed receivers list shown, allowed transactions also showed )
        - Time remaining: need to validate within this time period 


2. Correct Decision: 
 -ETH++ (based on priority fee,the validator receives, required to hire NPC charcaters and get customisable trinkets)
 -Reputation++ (Required to level up in game)


3. Wrong decision: 
 - Reputation-- 
 - (explain why it was invalid report )

4. Player is too slow!
 - The incoming cars accumulate 
 - Angrier customers  
 - Network congestion increases
 - cars stop coming  
 - Base fees cross the threshold !! with a visible indicator in different colours 
 - Game ends !
 - All reputationa and ETH earned from that level is lost, need to replay!

5. If Reputation falls too low !
 - Game ends! - give final report !
 - Validator offline 
 - Can't play that level
 - need to play previous level again!

6. Spend the ETH:
 - Hire NPC validator: 
    Eg: BOB- Cost:0.05 ETH, +5 transactions/minute, ALICE -Cost:2 ETH, +10 transactions/minute
 - Unlock anotehr toll booth: 
    Cost: 5 ETH, +15 transactions/minute
 - Customise Validator: 
    Hats, Backpack, Glasses etc. 
 