class Dialogues {
    static #CURRENT = null
    static #CURRENT_INIT_BY = null
    static HAS_KNOCKED_TODAY = false

    static #SCRIPTS = {
        FarmHouse_Door: {
            contents: ["You are at the farmhouse door.", "What would you like to do?"],
            options: [{
                text: "*Knock Knock*",
                act: "$knock_door"
            }, {
                text: "Enter the house",
                act: "$enter_farmhouse"
            }]
        },
        FarmHouse_Knock_First: {
            contents: ["You should knock before entering!", "It is only polite."],
            options: [{
                text: "You are right, let me knock.",
                act: "FarmHouse_Door"
            }]
        },
        FarmHouse_Knock_First_Reward: {
            contents: ["*Knock Knock*", "Welcome back! Here is $20 as a daily reward for keeping up the farm!"],
            options: [{
                text: "Enter the house",
                act: "$enter_farmhouse"
            }, {
                text: "Not yet, I am still outside.",
                act: "$close"
            }]
        },
        FarmHouse_Knock_Repeat: {
            contents: ["*Knock Knock*", "You knocked again and found $5 on the doorstep!"],
            options: [{
                text: "Enter the house",
                act: "$enter_farmhouse"
            }, {
                text: "Not yet, I am still outside.",
                act: "$close"
            }]
        },
        Recycler_interact1: {
            contents: ["Hello! I'm Tawfiq.", "People leave their trash everywhere.", "If you find any, bring it to me!"],
            options: [{
                text: "Here, I found some trash!",
                act: "$give_trash"
            }, {
                text: "I will keep an eye out.",
                act: "$close"
            }]
        },
        Recycler_trash_success: {
            contents: [
                "Excellent! Thank you for cleaning up the whole town.", 
                "Here is your reward for all the bags you brought!"
            ]
        },
        Recycler_trash_fail: {
            contents: [
                "Hmm... I don't see any trash in your pockets.", 
                "Come back when you find some green trash bags!"
            ]
        },
        Maryoma_interact1: {
            contents: ["Welcome to the Bar! *hic*", "What can I get for you today, kid?"],
            options: [
                { text: "Water (5$)", act: "$buy_water" },
                { text: "Orange Juice (15$)", act: "$buy_orange_juice" },
                { text: "Apple Juice (15$)", act: "$buy_apple_juice" },
                { text: "Nothing, just looking.", act: "$close" }
            ]
        },
        Bar_buy_success: {
            contents: ["Here you go! Enjoy your drink.", "Come back if you get thirsty again!"]
        },
        Bar_buy_fail: {
            contents: ["Sorry kid, you don't have enough money for that.", "Come back when you've earned some coins!"]
        },
        Grandmother_interact1: {
            contents: ["*Cough* *Cough*", "Oh my dear... I'm feeling so weak today..."],
            options: [{
                text: "Here, I brought the special medicinal juice!",
                act: "$give_juice"
            }, {
                text: "Rest well, grandma.",
                act: "$close"
            }]
        },
        Grandmother_juice_success: {
            contents: [
                "Oh... this smells wonderful.", 
                "(Drinks the juice)",
                "Thank you so much! I feel my strength returning already!"
            ]
        },
        Grandmother_juice_fail: {
            contents: [
                "You don't seem to have the juice... *Cough*"
            ]
        },
        Grandmother_scold: {
            contents: [
                "*adjusts glasses*",
                "You walk into MY house without knocking?!",
                "When I was young, we respected the house we live in!"
            ],
            next: "Grandmother_advice"
        },
        Grandmother_advice: {
            contents: [
                "Listen to me, my dear.",
                "Go work hard, earn money, and ALWAYS knock first!",
                "Now come in, since you are already here..."
            ],
            options: [{
                text: "Enter the house",
                act: "$enter_farmhouse"
            }]
        },
        Grandmother_fine: {
            contents: [
                "RUDE! No knock?!",
                "I am taking $15 from your pocket as a fine!",
                "Next time KNOCK first, you hear me?!"
            ],
            options: [{
                text: "Sorry grandma, I will knock next time.",
                act: "$enter_farmhouse"
            }]
        },
        Maya_interact1: {
            contents: ["Hello my Name is Maya", "What can I do for you, my dear customer?"],
            options: [{
                text: "I want to see what you have",
                act: "$trade"
            }, {
                text: "Nothing, have a nice day",
                act: "$close"
            }]
        },
        Zozo_interact1: {
            contents: ["Hey, I am Zozo. Looking for some animals for your farm?", "I have some fine livestock today."],
            options: [{
                text: "Show me the animals",
                act: "$trade"
            }, {
                text: "Not today",
                act: "$close"
            }]
        },
        Maryoma_interact1: {
            contents: ["Greeting, want something to drink?"],
            options: [{
                text: "Sure, what do you have",
                act: "Maryoma_interact2"
            }, {
                text: "Can you make the special juice for my grandmother?",
                act: "Maryoma_juice_info"
            }, {
                text: "No, thanks",
                act: "$close"
            }]
        },
        Maryoma_interact2: {
            contents: ["We have... water.", "And some fresh fruit juices too!"],
            options: [{
                text: "And...??",
                act: "Maryoma_interact3"
            }]
        },
        Maryoma_interact3: {
            contents: ["And that is it, for now."],
            options: [{
                text: "What kinds of bar only serves water and juice?",
                act: "Maryoma_interact4"
            }]
        },
        Maryoma_interact4: {
            contents: ["A healthy one! We take care of our customers."],
            options: [{
                text: "Never mind, have a nice day",
                act: "$close"
            }, {
                text: "Ok, I will have some water",
                act: "Maryoma_interact5"
            }]
        },
        Maryoma_interact5: {
            contents: ["Here you go, have a nice day"],
        },
        Maryoma_juice_info: {
            contents: [
                "Of course! I've heard your grandmother isn't feeling well.", 
                "If you bring me 1 Pumpkin and 1 Strawberry,", 
                "I can brew a special medicinal juice for her."
            ],
            options: [{
                text: "I have them right here!",
                act: "$make_juice"
            }, {
                text: "I'll be back later.",
                act: "$close"
            }]
        },
        Maryoma_juice_success: {
            contents: [
                "Perfect! Just a moment...", 
                "...here it is! A fresh medicinal juice.", 
                "Give this to your grandmother, it should help."
            ]
        },
        Maryoma_juice_fail: {
            contents: [
                "Oh, it seems you're missing some ingredients.", 
                "I need 1 Pumpkin and 1 Strawberry to make it."
            ]
        },
        Adian_interact1: {
            contents: ["Hey you, yeah I am talking to you", "Come here"],
            next: "Adian_interact2"
        },
        Adian_interact2: {
            contents: ["This is so stupid", "Have you ever see a bar that only serves water?"],
            options: [{
                text: "Well, water is good for your health",
                act: "Adian_interact2_disagree"
            }, {
                text: "It is kind of strange",
                act: "Adian_interact2_agree"
            }]
        },
        Adian_interact2_agree: {
            contents: ["Finally, there are still smart people on this plant", "I thought I am the one one left"],
        },
        Adian_interact2_disagree: {
            contents: ["Well go away then", "There is no reason for me to talk to someone like you"],
        },
        Medo_interact1: {
            contents: ["Hello stranger", "Never see you here before", "Where do you come from?"],
            next: "Medo_interact2"
        },
        Medo_interact2: {
            contents: ["Hmm interesting", "Just move here and inherit a farm", "from a recently deceased relative?"],
            next: "Medo_interact2_2"
        },
        Medo_interact2_2: {
            contents: ["Sounds like something that will", "only come out of a video game"],
            next: "Medo_interact3"
        },
        Medo_interact3: {
            contents: ["You see, I think it is great that", "there is a bar out here", "that only serves water and juices."],
            next: "Medo_interact3_2"
        },
        Medo_interact3_2: {
            contents: ["Energy drinks will only", "cause problem."],
            next: "Medo_interact4"
        },
        Medo_interact4: {
            contents: ["The youths these days do not", "understand the importance of", "taking care of their bodies."],
            next: "Medo_interact4_2"
        },
        Medo_interact4_2: {
            contents: ["You are not someone like that,", "aren't you?"],
        },
        Bar_TV1_1: {
            contents: ["The TV is airing the latest weather report"],
            next: "Bar_TV1_2"
        },
        Bar_TV1_2: {
            contents: ["It seems like tomorrow will be another sunny day"],
        },
        Bar_TV2_1: {
            contents: ["An old TV", "Do you want to turn it on?"],
            options: [{
                text: "Yes",
                act: "Bar_TV2_2"
            }, {
                text: "No",
                act: "$close"
            }]
        },
        Bar_TV2_2: {
            contents: ["The screen is still black", "The TV seems to be broken"],
        },
        Mimo_interact1: {
            contents: ["Hello! I'm Mimo.", "Welcome to Sundew Valley!", "It's so good to have you here."],
            next: "Mimo_interact1_2"
        },
        Mimo_interact1_2: {
            contents: ["This farm has a long history.", "It was once the heart of the village."],
            next: "Mimo_interact2"
        },
        Mimo_interact2: {
            contents: ["Your grandfather loved this land.", "But over time, it became neglected."],
            next: "Mimo_interact2_2"
        },
        Mimo_interact2_2: {
            contents: ["The farm was filled with trash.", "We need your help to bring it back!"],
            next: "Mimo_interact3"
        },
        Mimo_interact3: {
            contents: ["To start, you can plant seeds", "and sell your crops."],
            next: "Mimo_interact3_2"
        },
        Mimo_interact3_2: {
            contents: ["You can also raise animals", "and sell its products.", "That's how you'll earn money."],
            next: "Mimo_interact4"
        },
        Mimo_interact4: {
            contents: ["One more thing! Please keep it clean.", "If you leave trash around,"],
            next: "Mimo_interact4_2"
        },
        Mimo_interact4_2: {
            contents: ["It will cause pollution.", "Nature is precious, let's protect it!"],
        },
        Sebaey_interact1: {
            contents: [
                "Hey kid! Come here.", 
                "Why are there no energy drinks in this place?", 
                "And why is smoking prohibited here?!"
            ],
            options: [{
                text: "Because they are bad for your health.",
                act: "Sebaey_interact2"
            }, {
                text: "It's just the bar's rules.",
                act: "Sebaey_interact3"
            }]
        },
        Sebaey_interact2: {
            contents: ["Bad for my health? Nonsense!", "But I guess I have no choice...", "Guess I'll just drink water."]
        },
        Sebaey_interact3: {
            contents: ["Rules? What a boring place...", "Whatever, I'll just drink water."]
        },
        Soso_interact1: {
            contents: ["Help me please, I am very sick and hungry.", "Could you spare some money?"],
            options: [{
                text: "Give $10",
                act: "$give_money_10"
            }, {
                text: "Give $50",
                act: "$give_money_50"
            }, {
                text: "Sorry, I don't have any money",
                act: "Soso_no_money_response"
            }]
        },
        Soso_give_10_success: {
            contents: ["Thank you so much!", "This will buy me some bread to eat today."],
        },
        Soso_give_50_success: {
            contents: ["Oh! You are so generous!", "Now I can buy both medicine and a good meal.", "May God bless you!"],
        },
        Soso_give_fail: {
            contents: ["You don't even have that much...", "It's okay, I'll ask someone else."],
        },
        Soso_no_money_response: {
            contents: ["I understand... things are hard for everyone.", "Thank you anyway. Have a nice day."],
        },
        "7azo_interact1": {
            contents: ["Yo! Ready for some action?"],
        },
        Ganna_interact1: {
            contents: ["Hi there! Have you seen my friends around?"],
        },
        Kinzy_interact1: {
            contents: ["Hello! What a beautiful day to be in the town square!"],
        },
        Mario_interact1: {
            contents: ["Hey! I'm Mario. Nice to meet you!"],
        }
    }


    static #PORTRAIT_CONFIG = {
        maya: { scale: 1.55, yOffset: 0.6 },
        medo: { scale: 1.55, yOffset: 0.6 },
        mimo: { scale: 1.1, yOffset: 0.5 },
        maryoma: { scale: 0.9, yOffset: 0.47 },
        zozo: { scale: 1.1, yOffset: 0.5 },
        recycler: { scale: 1.1, yOffset: 0.5 },
        sebaey: { scale: 2.6, yOffset: 0.14 },
        soso: { scale: 2.6, yOffset: 0.14 },
        grandmother: { scale: 2.5, yOffset: 0.1 },
        "7azo": { scale: 1.1, yOffset: 0.5 },
        ganna: { scale: 0.9, yOffset: 0.47 },
        kinzy: { scale: 1.55, yOffset: 0.6 },
        mario: { scale: 1.55, yOffset: 0.6 }
    }

    static isAnyDialoguePlaying() {
        return this.#CURRENT != null
    }

    static getInitBy() {
        return this.#CURRENT_INIT_BY
    }

    static update(key, initBy) {
        this.#CURRENT = this.#SCRIPTS[key]
        this.#CURRENT_INIT_BY = initBy
    }

    static draw(ctx) {
        if (this.isAnyDialoguePlaying()) {
            ctx.save();
            
            const marginX = ctx.canvas.width * 0.05;
            const marginY = ctx.canvas.height * 0.05;
            const boxWidth = ctx.canvas.width - marginX * 2;
            const boxHeight = ctx.canvas.height * 0.22;
            const boxX = marginX;
            const boxY = ctx.canvas.height - boxHeight - marginY;

            // 1. Draw Dialogue Box (No Shadows, Creamy Amber Theme)
            ctx.save();
            ctx.shadowBlur = 0;
            const bgGradient = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
            bgGradient.addColorStop(0, "rgba(255, 252, 235, 0.96)");
            bgGradient.addColorStop(1, "rgba(255, 235, 170, 0.96)");
            ctx.fillStyle = bgGradient;
            
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 20);
            else ctx.rect(boxX, boxY, boxWidth, boxHeight);
            ctx.fill();
            
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(255, 180, 0, 0.5)"; // Amber Border
            ctx.stroke();
            ctx.restore();

            // 2. 3D Speaker Portrait Bubble (Popping out of the top edge)
            const portraitSize = boxHeight * 1.1; 
            const portraitX = boxX + portraitSize * 0.1;
            const portraitCenterY = boxY - portraitSize * 0.4; // Centered on the top edge (popping out)
            
            if (Dialogues.#CURRENT_INIT_BY && Dialogues.#CURRENT_INIT_BY.getName) {
                const charName = Dialogues.#CURRENT_INIT_BY.getName().toLowerCase();
                const config = Dialogues.#PORTRAIT_CONFIG[charName] || { scale: 1.1, yOffset: 0.5 };
                
                // Prioritize HD portrait, fallback to standard spritesheet
                const hdImg = ASSET_MANAGER.getImage("characters", "portraits", charName + "_hd.png");
                const charImg = hdImg || ASSET_MANAGER.getImage("characters", charName + ".png");
                
                if (charImg) {
                    ctx.save();
                    // Draw Bubble Background (Soft depth)
                    ctx.beginPath();
                    ctx.arc(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2, 0, Math.PI * 2);
                    const bgGrad = ctx.createRadialGradient(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, 0, portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2);
                    bgGrad.addColorStop(0, "rgba(255, 245, 200, 0.4)");
                    bgGrad.addColorStop(1, "rgba(255, 200, 100, 0.2)");
                    ctx.fillStyle = bgGrad;
                    ctx.fill();

                    // Draw Bubble Glow
                    ctx.beginPath();
                    ctx.arc(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 1.8, 0, Math.PI * 2);
                    const bubbleGrad = ctx.createRadialGradient(portraitX + portraitSize * 0.4, portraitCenterY + portraitSize * 0.4, 0, portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2);
                    bubbleGrad.addColorStop(0, "rgba(255, 255, 255, 0.3)");
                    bubbleGrad.addColorStop(0.8, "rgba(255, 215, 0, 0.1)");
                    bubbleGrad.addColorStop(1, "rgba(255, 180, 0, 0.3)");
                    ctx.fillStyle = bubbleGrad;
                    ctx.fill();
                    
                    // Clip and Draw Character
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2.1, 0, Math.PI * 2);
                    ctx.clip();
                    
                    if (hdImg) {
                        // HD Portrait (Single frame, high res)
                        ctx.imageSmoothingEnabled = true;
                        const drawW = portraitSize * config.scale; 
                        const drawH = drawW * (charImg.height / charImg.width);
                        const drawX = (portraitX + portraitSize / 2) - drawW / 2;
                        const drawY = (portraitCenterY + portraitSize / 2) - drawH * config.yOffset;
                        ctx.drawImage(charImg, drawX, drawY, drawW, drawH);
                    } else {
                        // Spritesheet Fallback (Pixel art)
                        const frameW = charImg.width / 4; 
                        const frameH = charImg.height / 4;
                        const drawW = portraitSize * 1.8;
                        const drawH = drawW * (frameH / frameW);
                        const drawX = (portraitX + portraitSize / 2) - drawW / 2;
                        const drawY = (portraitCenterY + portraitSize / 2) - drawH * 0.38; // Shifted down slightly (from 0.45)
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(charImg, 0, 0, frameW, frameH, drawX, drawY, drawW, drawH);
                    }
                    ctx.restore();
                    
                    // 3D Glassy Rim
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
                    ctx.beginPath();
                    ctx.arc(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2.1, -Math.PI * 0.8, -Math.PI * 0.2);
                    ctx.stroke();
                    
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "rgba(255, 180, 0, 0.8)";
                    ctx.beginPath();
                    ctx.arc(portraitX + portraitSize / 2, portraitCenterY + portraitSize / 2, portraitSize / 2.1, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // 3. Dialogue Content Layout (Increased padding and line height)
            const portraitExists = (Dialogues.#CURRENT_INIT_BY && Dialogues.#CURRENT_INIT_BY.getName);
            const contentOffsetX = portraitExists ? portraitSize * 1.3 : marginX * 1.5;
            const textFontSize = Math.floor(ctx.canvas.height / 28);
            const labelColor = "#5d4037"; // Warmer Rich Brown

            // Draw character name label
            if (Dialogues.#CURRENT_INIT_BY) {
                const nameStr = typeof Dialogues.#CURRENT_INIT_BY === "string" ? Dialogues.#CURRENT_INIT_BY : Dialogues.#CURRENT_INIT_BY.getName();
                const namePx = boxX + contentOffsetX;
                const namePy = boxY + textFontSize * 0.8;
                
                Font.draw(ctx, nameStr, textFontSize * 1.0, namePx, namePy, labelColor, "rgba(0,0,0,0.05)", "Segoe UI", "bold", false);
            }

            // Draw dialogue lines (Refined line index and spacing)
            let lineIndex = 0;
            Dialogues.#CURRENT.contents.forEach(_l => {
                Font.draw(
                    ctx, _l, textFontSize, 
                    boxX + contentOffsetX, 
                    boxY + textFontSize * (2.6 + lineIndex), 
                    "#3e2723", "rgba(255,255,255,0.1)", "Segoe UI", "bold", false
                );
                lineIndex += 1.5; // Increased line spacing from 1.3
            });

            // Handle Next Indicator / Options
            const hasNoOption = this.#CURRENT["options"] == null || this.#CURRENT["options"].length <= 0;
            let currentHover = -1;
            
            if (hasNoOption) {
                // Calm Floating Arrow (No Shadow)
                const indicatorX = boxX + boxWidth - textFontSize * 2;
                const indicatorY = boxY + boxHeight - textFontSize;
                const timeStr = Date.now() / 350;
                const floatOffset = Math.sin(timeStr) * 4;
                
                ctx.fillStyle = "rgba(255, 160, 0, 0.8)";
                ctx.beginPath();
                ctx.moveTo(indicatorX - 8, indicatorY - 8 + floatOffset);
                ctx.lineTo(indicatorX + 8, indicatorY - 8 + floatOffset);
                ctx.lineTo(indicatorX, indicatorY + 4 + floatOffset);
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw Options
                for (let i = 0, l = this.#CURRENT["options"].length; i < l; i++) {
                    const optionText = this.#CURRENT["options"][i]["text"];
                    Font.update(ctx, textFontSize);
                    const textWidth = Font.measure(ctx, optionText).width;
                    const optX = boxX + boxWidth - textWidth - textFontSize * 3;
                    const optY = boxY - textFontSize * (l - i) * 2.2 - textFontSize;
                    
                    if (MessageButton.draw(ctx, optionText, textFontSize, optX, optY)) {
                        currentHover = i;
                    }
                }
            }

            ctx.restore();

            // Mouse Click Handling
            if (!Controller.mouse_prev.leftClick && Controller.mouse.leftClick) {
                if (hasNoOption) {
                    if (this.#CURRENT.next == null) {
                        this.#CURRENT = null;
                        setTimeout(() => Controller.keys["KeyF"] = false, 50); // consume key buffer fast
                    } else {
                        this.update(this.#CURRENT.next, this.#CURRENT_INIT_BY)
                    }
                } else if (currentHover >= 0) {
                    if (this.#CURRENT["options"][currentHover].act.startsWith("$")) {
                        if (this.#CURRENT["options"][currentHover].act.localeCompare("$close") === 0) {
                            this.#CURRENT = null;
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$trade") === 0) {
                            this.#CURRENT = null;
                            GAME_ENGINE.getPlayerUi().startATrade(this.#CURRENT_INIT_BY);
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$make_juice") === 0) {
                            if (Level.PLAYER.tryUseItem("pumpkin", 1) && Level.PLAYER.tryUseItem("strawberry", 1)) {
                                Level.PLAYER.obtainItem("medicinal_juice", 1);
                                this.update("Maryoma_juice_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Maryoma_juice_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$give_juice") === 0) {
                            if (Level.PLAYER.tryUseItem("medicinal_juice", 1)) {
                                this.update("Grandmother_juice_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Grandmother_juice_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$give_trash") === 0) {
                            // Calculate total trash from both inventory and item bar
                            const invTrash = Level.PLAYER.getInventory()["trash"] ? Level.PLAYER.getInventory()["trash"].amount : 0;
                            const barTrash = Level.PLAYER.getItemBar()["trash"] ? Level.PLAYER.getItemBar()["trash"].amount : 0;
                            const totalTrash = invTrash + barTrash;

                            if (totalTrash > 0) {
                                Level.PLAYER.earnMoney(totalTrash * 15);
                                // Remove from inventory if exists
                                if (invTrash > 0) Level.PLAYER.tryUseItem("trash", invTrash);
                                // Remove from bar if exists
                                if (barTrash > 0) Level.PLAYER.tryUseItem("trash", barTrash);
                                
                                this.update("Recycler_trash_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Recycler_trash_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$knock_door") === 0) {
                            if (!Dialogues.HAS_KNOCKED_TODAY) {
                                Dialogues.HAS_KNOCKED_TODAY = true;
                                Level.PLAYER.earnMoney(20);
                                this.update("FarmHouse_Knock_First_Reward", null);
                            } else {
                                Level.PLAYER.earnMoney(5);
                                this.update("FarmHouse_Knock_Repeat", null);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$enter_farmhouse") === 0) {
                            if (!Dialogues.HAS_KNOCKED_TODAY) {
                                // Penalty for not knocking!
                                if (Level.PLAYER.getMoney() >= 15) {
                                    Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 15);
                                    Dialogues.HAS_KNOCKED_TODAY = true; // allow entry after fine
                                    this.update("Grandmother_fine", null);
                                } else {
                                    Dialogues.HAS_KNOCKED_TODAY = true; // allow entry after scold
                                    this.update("Grandmother_scold", null);
                                }
                            } else {
                                this.#CURRENT = null;
                                Transition.start(() => {
                                    GAME_ENGINE.enterLevel("bedroom");
                                    Level.PLAYER.setMapReference(GAME_ENGINE.getCurrentLevel());
                                    Level.teleportPlayer(24.5, 25.9);
                                });
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$give_money_10") === 0) {
                            if (Level.PLAYER.getMoney() >= 10) {
                                Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 10);
                                this.update("Soso_give_10_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Soso_give_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$give_money_50") === 0) {
                            if (Level.PLAYER.getMoney() >= 50) {
                                Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 50);
                                this.update("Soso_give_50_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Soso_give_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$buy_water") === 0) {
                            if (Level.PLAYER.getMoney() >= 5) {
                                Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 5);
                                Level.PLAYER.obtainItem("water", 1);
                                this.update("Bar_buy_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Bar_buy_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$buy_orange_juice") === 0) {
                            if (Level.PLAYER.getMoney() >= 15) {
                                Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 15);
                                Level.PLAYER.obtainItem("orange_juice", 1);
                                this.update("Bar_buy_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Bar_buy_fail", this.#CURRENT_INIT_BY);
                            }
                        } else if (this.#CURRENT["options"][currentHover].act.localeCompare("$buy_apple_juice") === 0) {
                            if (Level.PLAYER.getMoney() >= 15) {
                                Level.PLAYER.setMoney(Level.PLAYER.getMoney() - 15);
                                Level.PLAYER.obtainItem("apple_juice", 1);
                                this.update("Bar_buy_success", this.#CURRENT_INIT_BY);
                            } else {
                                this.update("Bar_buy_fail", this.#CURRENT_INIT_BY);
                            }
                        }
                    } else {
                        this.update(this.#CURRENT["options"][currentHover].act, this.#CURRENT_INIT_BY)
                    }
                }
            }
        }
    }
}