import { useState } from 'react';
const vacations = [
    {
        "vacationId": 1,
        "destination": "Pariz",
        "vacInfo": "An organized trip that also includes a flight to Paris allows an interesting glimpse of all the cultural abundance that the city has to offer.",
        "startDate": "21-07-2024",
        "endDate": "28-07-2024",
        "price": 1500,
        "pictureUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWa8tzGzLZxEdIviGeagN5rjZfbhqNHp68bg&s"
    },
    {
        "vacationId": 2,
        "destination": "London, United Kingdom",
        "vacInfo": "London’s a sprawling city at the center of everything: art, history, culture—you name it. But what sets it apart from other major hubs are its distinct neighborhoods, each with their own vibe. Spend an afternoon with the fam in Kensington: It’s got museums, parks, and plenty of other kid-approved things to do. Or check out edgy Shoreditch for cool shops and street murals (perfect for photo ops), then head to Soho where you can grab a pint at a pub or hit a club and party ‘til dawn",
        "startDate": "21-06-2024",
        "endDate": "28-06-2024",
        "price": 3000,
        "pictureUrl": "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg"
    },
    {
        "vacationId": 3,
        "destination": "Thailand",
        "vacInfo": "The lush jungles of Thailand promise adventure, while the serene beaches are the perfect place to splash in the sun. The Similan Islands feature some of the best dive sites in the world, where barracuda dart amid coral reefs and rock formations. Party in the nightclubs of Patong or linger over mango sticky rice at the famous Bangkok family restaurant Kao Neoo Korpanich",
        "startDate": "21-08-2024",
        "endDate": "28-08-2024",
        "price": 4000,
        "pictureUrl": "https://imageio.forbes.com/specials-images/imageserve/659693508de9ed1c25a60688/Wat-Arun-is-a-Buddhist-temple-in-Bangkok-Yai-district-of-Bangkok--Thailand--Wat-Arun/960x0.jpg?height=473&width=711&fit=bounds"
    },
    {
        "vacationId": 4,
        "destination": "India",
        "vacInfo": "From the beaches of sun-soaked Goa to the frenetic bazaars of Mumbai, India offers wealth of vastly different, yet equally enthralling, experiences. Explore the sparkling lakes and palaces of Udaipur, watch traditional Indian dance in Kochi, or buy brilliantly-colored silk saris at a market in Varanasi… no matter how much you travel in India, you’ll always find more to discover in this vibrant, fascinating country.",
        "startDate": "20-09-2024",
        "endDate": "27-09-2024",
        "price": 3600,
        "pictureUrl": "https://res.cloudinary.com/djcyhbk2e/image/upload/c_limit,f_auto,q_50,w_1400/v1/gvv/prod/iuom5wnuipsfnpoamzal"
    },
    {
        "vacationId": 5,
        "destination": "Nepal",
        "vacInfo": "The near otherworldly Himalayan kingdom of Nepal can trace its history back to the 7th century and the arrival of Kirati sheepherders. Today, misty temples perch on rugged ridges, monasteries peer over deep valleys, faded by centuries, and Kathmandu's Old City brims with ancient Buddhist temples and ornate palaces.",
        "startDate": "20-09-2024",
        "endDate": "26-09-2024",
        "price": 6000,
        "pictureUrl": "https://www.rjtravelagency.com/wp-content/uploads/2023/10/Nepal.jpg"
    },
    {
        "vacationId": 6,
        "destination": "Israel",
        "vacInfo": "From the Tel Aviv beach scene to the shores of the Dead Sea, Israel layers diverse cultures, outdoor adventures, and religious heritage onto a desert backdrop. Exploring here means history at every turn, while a humming food scene treats gourmet travelers to ultra-fresh flavors.",
        "startDate": "22-09-2024",
        "endDate": "30-09-2024",
        "price": 6000,
        "pictureUrl": "https://ik.imgkit.net/3vlqs5axxjf/TW/ik-seo/uploadedImages/Art/2023/1016/T1016OldCityJerusalemIntrepid_C_HR/Tour-operators-suspend-Israel-departures-and-brace.jpg?tr=w-780%2Ch-440%2Cfo-auto"
    },
    {
        "vacationId": 7,
        "destination": "Iceland",
        "vacInfo": "Icecaps and glaciers, spouting geysers and steaming solfataras, volcanoes, raging rivers and magnificent waterfalls, clusters of puffins and razorbills, and cavorting whales just offshore—it's all just another day in Iceland. This country's many geological wonders have brought a tourism boom, with most first-time visitors driving the Golden Circle Route through the southwest.",
        "startDate": "15-10-2024",
        "endDate": "25-10-2024",
        "price": 10000,
        "pictureUrl": "https://www.travelandleisure.com/thmb/QK4CuWpFdm2dR3NDznbBQtsAoN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/northern-lights-kirkjufell-mountain-snaefellsnes-iceland-ICELANDLIGHTS1218-824f48715748425f828f05aa2a28dfe0.jpg"
    },
    {
        "vacationId": 8,
        "destination": "Lapland, Finland",
        "vacInfo": "The northern most part of Finland, Lapland, is the magical arctic region full of contrasts. In fact, contrasts are a key factor in the allure of Lapland where 24-hour sunlight in the summer replaces the dark winter days filled with Northern Lights. Every season in Finnish Lapland is uniquely different from each other. The inhabitants of the region say that Lapland actually has 8 seasons instead of 4. In the wintertime, Lapland is as close as reality gets to those who dream of a winter wonderland. Spring brings along light that follows the long season of ‘kaamos’ (arctic night in Finnish)",
        "startDate": "15-11-2024",
        "endDate": "25-11-2024",
        "price": 15000,
        "pictureUrl": "https://www.kakslauttanen.fi/wp-content/uploads/2016/06/glass-igloo-poster.jpg"
    },
    {
        "vacationId": 9,
        "destination": "New York City",
        "vacInfo": "The tallest skyscrapers, the biggest museums, the cheesiest pizza. New York City takes everything to the max. It’s easy to see why it’s the most-visited place in the U.S.: Whether you want to check out historic landmarks, catch a Broadway show, or stroll the streets of Brooklyn, there’s no wrong way to do it—and something new to discover every time you go.",
        "startDate": "15-12-2024",
        "endDate": "30-12-2024",
        "price": 7600,
        "pictureUrl": "https://www.holidayhypermarket.co.uk/wp-content/uploads/2019/04/HH_NEWYORK_shutterstock_1740358463.png"
    },
    {
        "vacationId": 10,
        "destination": "Maldives",
        "vacInfo": "With 26 atolls and 1,000+ islands spread out across the idyllic waters of the Indian Ocean, the Maldives are an island-hopper’s dream. Below the water, there’s miles of coral reef that are home to thousands of species of marine life and underwater treasures. To get the best of it: Go diving at Broken Rock, snorkel with manta rays in Hanifaru Bay, or charter a boat to hit all the top spots. ",
        "startDate": "15-09-2024",
        "endDate": "30-09-2024",
        "price": 6800,
        "pictureUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPRW5QQ--6kRIQ5lUg2IJXj0KYMoTmGJw3w&s"
    },
    {
        "vacationId": 16,
        "destination": "The Bahamas",
        "vacInfo": "Bla Bla.",
        "startDate": null,
        "endDate": null,
        "price": 10000,
        "pictureUrl": "https://www.sandals.com/blog/content/images/2022/02/Nassau-The-Bahamas.jpg"
    }
]

const favorites=[
    {
        "idVacation": 2
    },
    {
        "idVacation": 3
    },
    {
        "idVacation": 6
    },
    {
        "idVacation": 10
    }
]

export class Vacation {
    public vacationId: number;
    public destination: string;
    public vacInfo: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public pictureUrl: string;
    public isFavorite?: boolean ;
  
    constructor(
      vacationId: number,
      destination: string,
      vacInfo: string,
      startDate: Date,
      endDate: Date,
      price: number,
      pictureUrl: string,
      isFavorite?: boolean
    ) {
      this.vacationId = vacationId;
      this.destination = destination;
      this.vacInfo = vacInfo;
      this.startDate = startDate;
      this.endDate = endDate;
      this.price = price;
      this.pictureUrl = pictureUrl;
      this.isFavorite=isFavorite;
    }
  }
  
const [allvac, setAllvec]= useState<Vacation[]>([])
setAllvec(vacations)
console.log("allvac- before:",allvac)
const result = vacations.filter(vacation=>
    favorites.some(favorite=>
        favorite.idVacation=== vacation.vacationId
    ))
console.log(result)


