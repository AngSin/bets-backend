# STEPS TO RUN:
1. `npm install`
2. obtain an odds-api key here: https://the-odds-api.com/#get-access
3. run `mysql` (suggested to run with docker)
4. use the credentials/db name for your mysql and enter them into a `.env` file along with your odds-api key (see `.env.example` for reference)
5. `npm start`

# FLOW
After the server is running this is how the application works:
1. GET http://localhost:3000/sports/soccer_epl will return all the current English Premier League games along with ones that were finished within 3 days ago
2. POST http://localhost:3000/bets will create a bet. This is the example request body for this endpoint:
    ```
        {
            "matchId": "e30fdf73c9ed3bb469aaf7d5fc6b9585",
            "sport": "soccer_epl",
            "value": 123,
            "signature": "0xa529771a4673592bff197a8ba052b94c446bf9e7caaeec6d5f0d4fd2ad2833e4442690ad8e783e6bc1366de400764061dd49c8e16277e0693cc246a650a2d1f11c",
            "validTill": 1733617982000,
            "homeToWin": true
        }
    ```
   1. where `matchId` is the id of the match you received from request no. 1.
   2. `sport` is the path parameter used in request no. 1.
   3. `value` is the number of tokens you want to wager in this bet (must be uint).
   4. `signature` of a wallet using the string you specified in the `.env` file (default is "I WANT TO PLACE THIS BET" in `.env.example`). Tip; you create a signature by clicking on "Sign Message" here: https://etherscan.io/verifiedSignatures#.
   5. `validTill` is a future timestamp
   6. `homeToWin` is whether you think the home team will win this match or not
3. GET http://localhost:3000/bets will return all the bets. Notice the response will have `null` and `false` for properties `winnerId` and `completed` respectively, for any ongoing bets. A `null` value for `competitorId` means the bet has not been accepted by anyone yet. The response will look something like this:
   ```
   [
       {
           "id": "86623556-9040-42f5-a81d-cee78015c7b4",
           "sport": "soccer_epl",
           "matchId": "e30fdf73c9ed3bb469aaf7d5fc6b9585",
           "validTill": "2023-12-08T00:33:02.000Z",
           "creatorId": "0xE03E3F9aD56862184594F95811bD18cDC0Bab495",
           "competitorId": null,
           "winnerId": null,
           "value": "123",
           "homeToWin": true,
           "completed": false
       }
   ]
   ```
4. POST http://localhost:3000/bets/accept will let a user accept an active bet. The request body for this endpoint should look like:
   ```
   {
       "id": "86623556-9040-42f5-a81d-cee78015c7b4",
       "signature": "0xd0fa8481af0daa58ee9ad31ac5cf674dce8f7cd4f020858b52dcb2444c63b54d45021066aa10997da16fe11be7fe6700228be9cc293caff3a1c4c1161c0873511c"
   }
   ```
   1. where `id` is the `id` of the bet (as seen in request no. 3).
   2. `signature` is the signature created by a wallet using the string defined in `.env` (similar to request no. 2.).
   3. if request no. 3 is now repeated the `competitorId` field will be filled out with the competitor's wallet address.
5. POST http://localhost:3000/bets/settle will settle any incomplete bets. The request body for this endpoint should define which sport the bets should be settled for. It should look something like this:
   ```
   {
       "sport": "soccer_epl"
   }
   ```
   It is suggested to call this endpoint periodically through a scheduled job (like CRON) to settle bets frequently. After the bet is settled, the response to request no. 3 will include a populated `winnerId` indicating which of the two wallets won that bet, provided only that the sporting match has finished by now.
6. GET http://localhost:3000/sports will give you more sports league options if you would like to repeat this process for another sport or league. Simply replace the term `soccer_epl` in request 1 and you can repeat the process.