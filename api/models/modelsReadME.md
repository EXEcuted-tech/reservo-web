# Guide to install Full DB of reservo

1. Import the "initialize.sql" THIS IS A MUST.
2. Import the ff in the EXACT ORDER:
    - account.sql
    - feedback.sql
    - merchant_sched.sql
    - merchant.sql
    - inventory.sql
    - package.sql
    - payment.sql
    - reservation.sql
    - payment_alter.sql

# To install specific DB just do the same step but only stop to where you needed
(e.g) To import merchant you need to import initialize, account, feedback, merchant_sched, and lastly merchant.