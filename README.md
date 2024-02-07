**PROJECT NAME**

Saturday. 
An ecommerce platform, selling different type of women shoes.

**OVERVIEW OF PROJECT**

The project focuses on developing an ecommerce platform tailored specifically for women's Apperals targeted for shoes and bags, aiming to provide a seamless and user-friendly shopping experience for customers seeking fashionable and comfortable footwear. It consist of a varity of style including flats, sandals, heels and bags with seasonal options like Chinese New Year 2024, Italy Collections and even a Modern day bags for everyday use. With an emphasis on user interface design, the website or application will offer intuitive navigation, allowing customers to easily browse, search, and filter products based on various criteria such as size, color, and brand.Additonally, it is responsive for mobile and tablet to ensure user satisfication. 

The color Scheme that our website use actually consist of different shade of pink (#CD8D7A and #F4D9C6) and white as the base, it give user a comfortable and pleasant time when browsing the website as the colors are not contrasting which make it more comfortable for the eyes. For games, we actually went further in exploring colors where we did not stick to our color scheme but actually use bolder colors like (81689D,maroon) and different shade of blue for the background which will make it very unqiue when compared with other website. 


**DESIGN PROCESS**

In our design process, we aim to target women who are looking for affordable shoes and bags. We want to ensure that our products are accessible to everyone, including students. Additionally, we've created games that provide users with offers and points that can be redeemed. This way, users can enjoy our products without overspending.

Typically, when shopping online, people either make immediate purchases or add items to their carts but don't proceed to checkout due to the high total cost. We want our users to have an enjoyable experience without breaking the bank. To achieve this, we offer more than just points on specific days like 11.11 sales hence we enhance user interactions by providing additional points to redeem vouchers of great discount. 

Our goal is to make affordable and stylish products accessible to all, ensuring that our users not only look good but also save money in the process. The game design was also taken into consideration as since its gaming i decided to not use the colors that are specifically in our theme of our website but a different kind of vibe where users can have fun and relax at the same time. 

Additionally, we make it more fun where we actually use animated icons/images (lottie) for when user checkout and when user send a contactUs form. Which also come with some text and images of products to reintroduce users about our new arrivals / games. 

In conclusion, the whole purpose is to make user comfortable, have fun and at the same time try something different than other e-commerce platform. As our website not only just stick with the originals but we make things differently and unqiue from others. 

**LIST OF USER STORIES**

1. For the slideshow, when user click on the carrot, there will be different banners for them. 
2. When user clicks on any product not in the product page (NewIn,Shoes and bags) they will be redirect to anyone of the page according to the item. 
3. When user type into a field they will be bought to their specific page filled with information and animations. 
 


**FEATURES**

1. An automatic and manual slideshow which user can interact with it by seeing the style of our store,offers and ongoing ot upcoming campaigns. It is accompanied by the nav bar when its on top, it will be transparent but when u start scrolling, it become a sticky navbar and will change the background color to white. [Raeann]

2. A autoplay video where it will autoplay in a loop whenever the index.html page is refresh. (Just a bonus to make it nice).  [Raeann]

3. When responsive, the navbar will turn into a menu icon and when clicked, the navbar will appear as a sidebar to make it easier for user to navigate when in mobile. [Raeann]

4. A filter for each category of women shoes. It will let users to chose what type of shoe they want and will lead them to the specific product in the same page. (Did it only for New Arrivals and Shoes). [Raeann]

5. Users will be able to add their products into the cart and checkout with a popup message of how many points we get in total. This feature consist of storing the calculated points into restdb and after it will display text, even a lottie animation and will intro the the games so that user can earn points. But only when user login, they can checkout if not will be prompt to do so.  **[JoeYi - api]**

6. For sign up, users will be able to sign up and when success they will be redirected to the login page to login and thn when sucessful they will be redirected to the index page and the navbar of signup and login  will be hidden and the account,game and shopping cart logo will appear for easy navigation for users wanting to earn points ( this is because users bave to sign up before they can purchase or checkout anything from this shop). [Raeann]

7. For Contact Page, when user press submit, the contact form will be hidden and will be greeted with a animation of form being sent to our customer service and will get a text display to gain users attention. [Raeann]

8. User will be able to navigate to the game page to play three different types of games to earn points so that they can redeem voucher up to $50 OFF.  [Raeann]

9. Wheel It - where users get a limit of 5 times and have to wait for 24hrs to reset the number of spins, users will also get points through the wheel in random. **[JoeYi]**

10. Shoes Memories - it is a memory card game where users will be times for a limit of 40s and if they sucesfully win the game they will be able to get points or sometimes they will get nothing. but if you lose, there will be a popup message saying that try again. **[JoeYi]**

11. Word Wizard - a game where is inspired by hangman where there is a random words that are related to our website, there is also a time limit of 30 seconds and a mistake limit of 6. so if you go over the time limit or hit 6 mistake , it will hide the keyboard and display you lost. if users are able to guess the hangman name they will earn points in random. **[JoeYi]**

12. With the points earned from games and checkout, users will be able to redeem voucher with their points in the account page and when they redeem, the points in the restdb will decreased. The points and amount of voucher redeemed will be displayed and stored in account page in local storage. **[JoeYi]**

**WORKED DONE**

We mostly do everything together since we are using github. Both of us did abit of everything and make sure that we both understand front end and back end. 
1. Raeann - Did front end, focused on user interaction, design and asethetic wise. 
2. JoeYi - Did back end, focused on implementing restdb into the javascript. 

**TECHNOLOGY USED**

The Language we use is HTML, CSS, JavaScript and abit of Bootstrap.  

I also use additional libraries like : 
1. fa fa Icons - > i used it because it is very easy for to add icon just by using the <i class=""> function
 https://fontawesome.com/v4/icons/

2. CSS Fonts w3 school - > i used  because when i use google fonts it take very long to load and sometimes the code given doesnt work on my side so i used css font style to change my font style 
 https://www.w3schools.com/css/css_font_google.asp 

3. RESTDB -> used it because it is simple and easy to use as a backend tool. 
https://restdb.io/login/

4. JQUery -> used to simplify DOM Manipulation. 


**TESTING ->** (got testing of database , points and maybe adding to cart.  )

1. Login Form : 
Go to Login.html page 
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
In addition, when we login, it will redirect us to the index page with the navbar being updated where sign up and login are hidden and replaced by the icons of game, account and shoppingcart. 

2. Sign Up Form:
Go to Register.html page 
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
In addition, when sign up succesfully, the details inputed will be stored at the restdb and make it able to log in with the username and password that is stored under the restdb. 

3. Contact form:
Go to the "Contact Us" page
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

**DIFFERENT BROWSWER AND SCREEN SIZE**

1. We normally use max-width (600px,1024px). We targeted the most used device which is mobile,laptop and desktop. 
2. For our website, every page looks rather pleasing and comfortable even if it is in a small screen of max width 600px. for 600px, the width and height must be lessen by quite alot according to the amount of content that it is in the page 

3. For 1024px, it is quite challenging as it might actually interfere with the 600px and make the whole website alignemnt go everywhere but its managable to an extend where we need to make the height and width slightly smaller or larger so there is alot of trial and error

4. For browser, i actually tried on bing and google and i would say that both website looks the same in both browser but i would prefer to use bing because it is easier to see the responsiveness of the website while google is abit hard because when u inspect, sometime they will not let you see the error. (will test of FIREWALL)


**BUGs and CHALLENGES**

1. We actually met with a challenge with backend where we could not POST the sign up details to the restDB in the same javascript we initially created. (we planned to use one only) So, we had to clarify with our lecturer to see if it is possible to have more than one javascript and it works when i create another one. 

2. We also had troubles with storing the points while getting the username as a unqiueID. It is confusing as we are dealing with two method PUT and GET and it can mess up our mind alot espically when we tried doing console logs and the error are getting lesser but in the end it just doesnt work. But in the end we use async method and it works with catched error if it doesnt work. 

3. For design wise, we were fine is just when there are more and more stuff to be added the allignments are all over the placel. It is worst when our computer size is different which make it hard but manageable. We just make @media according to our computer screen size and it helps alot for us when we are doing together. 


**LINK TO GITHUB**
https://github.com/RaeannTaiYuXuan/FEDASSG2



**Credits :** 

Inspired by : SundayStaples,Lovet and LoveBonito.
1. https://sundaystaples.com/
2. https://lovet.sg/
3. https://www.lovebonito.com/sg


**Media:**
Video for index page ->
1. https://www.pexels.com/video/salesperson-putting-a-bag-inside-a-paper-bag-9595334/

Others -> Some pictures are taken from canva and edited by Raeann.  
2. https://www.canva.com/

For Bags ->
1. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRNPQGc_p46BHFoKuQnK49D0T0XuCG7YleVmEmh9VK_U2TCheY
2. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYLtajRzGG7CsS1bXbJWeBWlsFJXYQSHhYT3f4xvEZOb_grFqp
3. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRDAh6kkk8xFAzZQp9N1vKuEn_h5o1hXI5zahx1d5RYx4lVcZde
4. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOyrkbC7JTm7hSeHjKiJd6ElF1-Ldg_HJfUzxw_kfVRntrV1EX
5. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRzh25t7xV2KXGfYmAu5BeMrCiWkpHQ9HUvQoRXDaI4xexrLsW0
6. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRPgYIY1K6ZAO8Xqh8mBA0AnB_dbgXihZDxfHt4SxLo4oyq_z0c
7. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQRRRPlkpQJkmkGgzwc_LNNQOyJclaqpYcII471vJJx55xs0r4K
8. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTAWExe03sAtrZzBZlHlpGdMzy5k1eynzU8iTfC7s7xV6lv75
9. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxBhr3euRbbEuxNdP8ReHIcUXeT7xZ5SayeqzgTjhT1ED-5tO
10. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcThzuulzVPdNwOhJFQ9Gper_ncIjJXR-lCXKxM57_bl7wuCSOre
11. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR2lZNBGXmH35-2pvvFpACpvA3E6dBo7-1kD49iD_jbEIlkflf1
12. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSAf-5f3J0314V1bqMkdmmGacLXQsdJUBHvVUhZfU28lv1oC7zl
13. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSQTZ_9kTgsOklH7qglNE0PF_lV_ssOBqS6HqFLF5JbcGcVeluO
14. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRaz7vZlemiSChfva9PGY8aQzS6TaNPJFBzwaCqk_sUyeqBAjNN
15. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ9rIf03xJxwm7xx2AxK5axpY2aKgjnjJJ8kdn7CZLSrx4e9ZY4
16. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEBbVDE9_O-RfwPVqz_2ukjcW79IWDBdMlZAr13Mjg2axU0yDe
17. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRSW0CwbGC2JZg9mYfTnfdyC5L5GRp-SznFRp4YP-Nuac5AbV0I
18. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoAEcaTnWAsszlZzvYiNt-0QOiMLsBF22l-L82HSTQBwS5JtCY
19. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkZagadiBvxezu-d28A9gAxUfJ4yxn8Y7kM6z6NJrh9D50zAEF
20. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQuuaudKhUPMP5tDT3T-SFR8qBJItmc9k6HoOOBdKp-tBFhN2Ym
21. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VAOIPdHkCVowtJxQvuCEb1CBv30afqkZfJQpa2Gbsek2Cbcc
22. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRmASlJu3kT8N-k91YOWwVsGMqkpidmHWAszkLdgCPoZKrjXnCP

For Shoes ->
1. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT82EdTR6G8vq-dN1lR4JJj9oO9hLFjVbexO3zruWsU_pW26382
2. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPeA44tDHBrj1obUhQ5dI_MQzr_QH3VwGlY4k7DoEF3QkXdu0P
3. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ21l78ckbipgkVV8tk72JBdvix8IIkwT1yKhOKI-pNtC_SQVGQ
4. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Fo_qUtMJw663jRrQCZnNZjnTqZaPqvIPeo-DlQTi3nrtpBm5
5. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhDs1KUnAxaF2384tanLSY-1p6XYCZ8di5N2O4nOY1coR3zCa
6. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiSazBwCKVEjTz6mEO2iXRQkOJdeVkfOj3ev6PpZjeTtpYuJZC
7. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4qva-MHPp3ydjltUxwyvp_yOwrIde_iRW4Ds0gNyBhGdKqq26
8. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQf2f_HyklJ8eH5mwqZdQgOtasF_zxXOiU_ED_VKBBHlKXaa6Lx
9. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAUbl16yjEo_TKliBLznMHu21MlS01Rl6S1pmAatafO9zLRL5F
10. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIXzhavSkDluklqpRZ3SVprTwTf7D4q9KwWW918QtuMTgPUoGs
11. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2IafQQ9WngkjUgAFyEZ2SbRqCW0Ff927k2mJjcPLQG2pAW1F2
12. https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4vXNRgrQDIySkVOlP3Dijl6ESUSjY6AcA0ndu8qK5sxwiJz99
13. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRXjxKyo4YFRUyvDT__xugeo3wcWYkOW5sbsv09CeOq8VhNTfoP
14. https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQFtXjJt_QKV8WXBhN3UsiwNYkmXJUEQG2gdAuXKtLZA0aSebYf
15. https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkhHeQl8EeK77nL58-TGEz1BykwquDnBOVtARLOR3JJfXgwe2w
16. https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-xifCY_Z5ngMTv-ogB7Au1ADFTiXjqU5ZiClzsGi2gY-g-Rp
Banners ,slideshow images ->
1. https://sundaystaples.com/pages/new-look-book
2. https://www.canva.com/ - design my own for some. 
3. https://www.freepik.com/

Lottie -> 
1. https://app.lottiefiles.com/animation/31013406-320b-4e5e-8f4f-b8e0ab458d78?channel=web&source=public-animation&panel=embed


Acknowledgements:
I received inspiration for this project from Sunday.staples which is a shoe store like what i am trying to do but in my own design and also my own color palette which make it insteresting. 
https://sundaystaples.com/

