(function () {


    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;



        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;


    }

    //interface describing what the passenger array should look like
    interface IPassengerArray {
        [index: number]: Traveler
    }



    // food(wagon)
    // Return the total amount of food among all occupants of the wagon.




    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray: IPassengerArray;



        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;



        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;



        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food;
        name;
        isHealthy;

        constructor(name: string,
            food: number = getRandomIntInclusive(1, 100),
            isHealthy: boolean = true) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt() {
            let randomNumber = getRandomIntInclusive(1, 100)
            if (randomNumber % 2 == 0) {
                this.food += 100;
                if (this.food >= 20) {
                    this.isHealthy = true;
                } 
            }
            return this.food;
        }

        eat() {
            if (this.food >= 20) {
                this.food -= 20;
            } else {
                this.isHealthy = false
            }
            return this.isHealthy;
        }

    }


    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface
    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[] = [];

        constructor(capacity: number) {

        }

        addPassenger(traveler) {
            if (this.passengerArray.length >= this.capacity) {
                return "Wagon full.  Passage denied.";
            } else {
                this.passengerArray.push(traveler)
                return "Welcome aboard!";
            }
        }

        isQuarantined() {
            for (let i = 0; i < this.passengerArray.length; i++) {
                if (!this.passengerArray[i].isHealthy) {
                    return true;
                }
            }
            return false;
        }

        getFood() {
            let totalFood = 0;
            for (let i = 0; i < this.passengerArray.length; i++) {
                totalFood += this.passengerArray[i].food;
            }
            return totalFood;
        }

    }


    // /*
    // * Play the game
    // *
    // * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)

    let Traveler1 = new Traveler("Adam");
    console.log(Traveler1);
    let Traveler2 = new Traveler("Mary");
    console.log(Traveler2);
    let Traveler3 = new Traveler("Paul");
    console.log(Traveler3);
    let Traveler4 = new Traveler("Josefa");
    console.log(Traveler4);
    let Traveler5 = new Traveler("Peter");
    console.log(Traveler5);

    // * Create wagon with an empty passenger list and a capacity of 4.

    let TheWagon = new Wagon(4);

    // * Make 3 of 5 the travelers eat by calling their eat methods

    console.log("Adam is healthy = ", Traveler1.eat());
    console.log("Mary is healthy = ", Traveler2.eat());
    console.log("Paul is healthy = ", Traveler3.eat());

    // * Make the remaining 2 travelers hunt

    console.log("Josefa's Food is: ", Traveler4.hunt());
    console.log("Peter's Food is: ", Traveler5.hunt());


    // * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    // * of attempting to be being added to the wagon using the wagons addPassenger method.

    let travelerArray: Traveler[] = [Traveler1, Traveler2, Traveler3, Traveler4, Traveler5]
    for (let i = 0; i < travelerArray.length; i++) {
        let wagonChance = getRandomIntInclusive(1, 100)
        if (wagonChance % 2 == 0) {
            console.log(travelerArray[i].name, "might join the wagon.")
            console.log(TheWagon.addPassenger(travelerArray[i]));
        }
    }


    // * Run the isQuarantined method for the wagon

    console.log("The wagon is quarantined = ", TheWagon.isQuarantined());
    

    // * Run the getFood method for the wagon

    console.log("The total food on the wagon is: ", TheWagon.getFood());

    // * the return values of all the methods should be displayed in the console using console.log()
    // * the console.log statements should not live inside any methods on the objects
    // *
    // */

})();



