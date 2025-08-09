/*
Find the top K companies by compensation from 
the below dataset. Sample values from the dataset look like below.

[
 {
   "company": "Alphabet",
   "salaries": [
     {
       "salary_id": "bf8d9669-77f2-4a9b-ba8c-4d06a2da36fd",
       "location": "London, EN, United Kingdom",
       "level": "L3",
       "total_compensation": 110000,
       "currency": "GBP"
     },
     {
       "salary_id": "ah8d2332-88f2-5b9b-ba8c-4d06a2da36fd",
       "location": "Mountain View, CA, United States",
       "level": "L4",
       "total_compensation": 140000,
       "currency": "USD"
     }
   ],
   "subsidiaries": [
     {
       "company": "Fitbit",
       "salaries": [
         {
           "salary_id": "ph8d2332-33x2-5b9b-ba8c-4dz6a2da36fd",
           "location": "Amsterdam, NH, Netherlands",
           "level": "SDE II",
           "total_compensation": 140000,
           "currency": "EUR"
         }
       ],
       "subsidiaries": [..]
     }
   ]
 },
 {
   "company": "Walmart",
   "salaries": [
     {
       "salary_id": "aa8c1669-77f2-4a9b-ba8c-4d06a2da36fd",
       "location": "New York, NY, United States",
       "level": "x3",
       "total_compensation": 210000,
       "currency": "USD"
     }
   ],
   "subsidiaries": [
     {
       "company": "Flipkart",
       "salaries": [
         {
           "salary_id": "kf8z2559-22b1-aa9b-ba8c-4d43a2da36fd",
           "location": "Bangalore, KA, India",
           "level": "SDE I",
           "total_compensation": 400000,
           "currency": "INR"
         }
       ],
       "subsidiaries": [
         {
           "company": "E-kart",
           "salaries": [
             {
               "salary_id": "vci8z2559-22b1-aa9b-assc-4d43a2da36fd",
               "location": "New Delhi, India",
               "level": "Director",
               "total_compensation": 300000,
               "currency": "INR"
             },
           ],
         }
       ]
     }
   ]
 }
]

*/

function getTopKElements(arr, k) {
  const arryCopy = [...arr];
  const sortedArray = arryCopy.sort((a, b) => b.price - a.price);
  return sortedArray.slice(0, k);
}
