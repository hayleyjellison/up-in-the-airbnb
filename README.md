![airbnb](static/images/newairbnb.jpeg)

# Up in the Air{bnb}
Website: https://hayleyjellison.github.io/up-in-the-airbnb/

## Group Members

* Chris Nguyen (Team Leader/Data Scientist): [@c-l-nguyen](https://github.com/c-l-nguyen)
* Hayley Jellison (Git Master): [@hayleyjellison](https://github.com/hayleyjellison)
* Hazel Despain (Product Manager): [@hazeldespain](https://github.com/hazeldespain)
* Nathan Wong (Web Developer/Data Scientist): [@toestie](https://github.com/toestie)
* Paul Vonder Haar (Data Engineer): [@paulvonderhaar](https://github.com/paulvonderhaar)

In this project, we are taking data from Airbnb properties around Austin, Texas to analyze basic property information (such as room types and fees by region) using Tableau and to analyze the text contained within the review comments users submitted. We clean the text data by getting rid of filler words in reviews such as "the", "of", "and" using PySpark and the John Snow NLP library. The text is then analyzed using pretrained pipelines for sentiment analysis and the most common ngrams. Visualizations are then created to show a map of sentiment values for Airbnb listings and a dashboard showing the ngram analysis by zipcode. Finally, an RNN was trained using LSTM on the text to create AI generated reviews and we display all of this on our website.

Tools we used:
* John Snow Spark NLP Library
* AWS
* Tableau
* Javascript libraries (Leaflet, Anychart)
* HTML/CSS
* Databricks
* PySpark
* Recurrent Neural Network (RNN)

## Data Sources
* https://www.kaggle.com/clnguyen/austinairbnbs20191112
* http://insideairbnb.com/index.html

## References
* https://brandongaille.com/24-airbnb-hotel-industry-statistics-and-trends/
* https://www.datacamp.com/community/tutorials/wordcloud-python