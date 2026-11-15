# Banana Split Simulator

Welcome to Banana Split Simulator! Run your own banana split shop, prepare customer orders, earn coins, unlock ingredients, and upgrade your shop.

## How to Play

### 1. Prepare the Banana
- Click the Split Banana button.
- Your banana must be split before adding ice cream.

### 2. Add Ice Cream
- Choose from vanilla, chocolate, and strawberry.
- You can add up to 3 scoops by default.
- Purchase the Bigger Tray upgrade to increase your limit to 4 scoops.

### 3. Add Toppings
- Add cherries and chocolate sauce.
- Unlock sprinkles and nuts from the Ingredient Shop.
- You must unlock sprinkles and nuts before using them.
- You can only add each topping once per dessert.

### 4. Follow Customer Orders
- Each customer receives a random order.
- Check the requested ice cream flavours and toppings.
- Match the order as closely as possible.
- Click Serve Customer when your dessert is ready.

### 5. Earn Coins
- Earn 20 coins for each correctly completed order.
- Incorrect orders do not earn coins.
- Purchase ingredients and upgrades with your coins.

## Ingredient Shop

Spend your coins to unlock additional toppings.

| Ingredient | Price |
|---|---:|
| Sprinkles | 30 coins |
| Nuts | 40 coins |

Unlocked ingredients become available in your kitchen and can appear in customer orders.

## Shop Upgrades

Improve your shop with permanent upgrades.

| Upgrade | Price | Benefit |
|---|---:|---|
| Bigger Tray | 100 coins | Increase the scoop limit from 3 to 4 |
| Better Rewards | 60 coins | Earn 30 coins per successful order instead of 20 |

Each upgrade can only be purchased once.

## Order History

The Order History section records your completed orders.

- Green text means the customer is happy.
- Red text means the customer is mad.
- Your order history helps you review your performance.

## Game Settings

### Reset Game
- Click Reset Game to open a confirmation popup.
- Confirm to reset your game.
- Your coins become 0.
- All purchased ingredients become locked.
- All upgrades return to their original settings.
- Your current dessert and customer order reset.

Important: Reload the page after resetting to ensure the game displays the fresh starting state correctly.

### +100 Coins Button
- Adds 100 coins to your balance.
- Located next to the Reset Game button.
- Designed for faster testing and reviewing.
- Use it to test shop purchases and upgrades without repeatedly completing orders.

This is a testing feature, not a normal gameplay reward.

## Saving Progress

The game uses your browser's localStorage to save:
- Your coin balance.
- Purchased ingredients.
- Purchased upgrades.
- Your scoop limit.
- Your successful order reward amount.

Your saved progress remains available after refreshing the page in the same browser.

Resetting the game clears the saved progress listed above.

## Features

- Interactive banana splitting.
- CSS-based banana and dessert visuals.
- Three ice cream flavours.
- Four available toppings.
- Randomized customer orders.
- Order matching system.
- Happy and mad customer feedback.
- Coin reward system.
- Ingredient shop.
- Permanent shop upgrades.
- Order history.
- Automatic progress saving.
- Game reset with confirmation popup.
- +100 coins testing button.

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser localStorage

No external game engine is required.

## Developer Note

The +100 coins button exists to make testing and reviewing faster. It allows the developer or reviewer to test purchases and upgrades without grinding for coins.

