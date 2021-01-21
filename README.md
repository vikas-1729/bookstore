# Getting Started with Create React App
This project was Hoisted on  [Hoisted link](https://bookstore-xi.vercel.app/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

All started releated information has been given in deployment-instruction.html please have a look

if you get any problem in installation drop me a mail on vikas.11081997@gmail.com

I have added a file in zip name depolyment-instruction.html where you will find all necessary instruction for local setup to run this on you local computer
**Here i am trying to make you understand my code flow with functionality you have given in this test**

> data loading

for very first time when you run this project on your localhost it will go to mention api through async call and get all data and store in indexDB so for using IndexDB easily i use dexie module
after the data is loaded you landed to home page where you see a search bar in
![it is default when you haven;t search anything

![enter image description here][1]{:target='_blank'}


> search functionality

in the input text you can enter title, author or id and corresponding to that you have to choose from given options and then press enter it will go hit the indexDB fetch the result and store in application state i.e redux and result are shown to us on page 

![enter image description here][2]{:target='_blank'}

> Cart Functionality

so for implementing this functionality with persistent data i have created anothe rtable in indexDB named 'cart' to store our activites so  basically you can select the book add to cart go to cart see them and also if you want remove them all data are stored in IndexDB so they are persistent .You can apply column selector there also

![enter image description here][3]{:target='_blank'}

> Coloumn Selector

so now after the result come we want that we sort it acconding to our need like in order of price , likes , bookId so we select it add a function which basically use javascript array function to sort the  array and get the required result


  [1]: https://he-s3.s3.amazonaws.com/media/uploads/4ea5e91.png
  [2]: https://he-s3.s3.amazonaws.com/media/uploads/5e0d362.png
  [3]: https://he-s3.s3.amazonaws.com/media/uploads/6c23d21.png


##Tech used
  React ,Javascript mainly and also other libraries like redux,dexie 
