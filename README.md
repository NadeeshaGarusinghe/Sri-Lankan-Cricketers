# Sri Lankan Cricketers- Search Engine

Sri Lankan Cricketers- Search Engine enrich with details about over 325 Sri Lankan Cricketers.
## Table of contents

- Technologies
- Corpus
- Setup
- Screeshots

## Technologies
Project is created with:

- Elasticsearch version: 7.6
- React version: 16.13.1


## Corpus

https://www.espncricinfo.com/

#### Attributes

1. සම්පූර්ණ නම    
2. උපන් ගම    
3. උපන්දිනය    
4. වයස    
5. පාසල     
6. ඡායා රූප  
7. ජීවන දත්ත    
8. අන්වර්ත නාම    
9. පිතිකරන විලාසය     
10. පන්දු යවන ඉරියව්ව	
11. ක්‍රීඩා ඉරියව්ව     
12. පුද්ගල වාර්තා      
13. කණ්ඩායම්     
14. පුද්ගල දක්ශතා 


## Setup

Execute the data scraping scripts or use the uploaded corpus.

Create Elasticsearch instance

```$ curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
$ echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
$ sudo apt update
$ sudo apt install elasticsearch
$ sudo systemctl start elasticsearch 
```
Create a new index in elasticsearch insatnce.
```
curl -X PUT "localhost:9200/srilankancricketers?pretty"
```

Execute the data migration script to upload the documents to elasticsearch.

Clone the repository
```
$ git clone https://github.com/NadeeshaGarusinghe/Sri-Lankan-Cricketers.git
```

Setup React Server
```
$ cd ReactFrontEnd
$ npm install
$ npm start
```


## Screeshots

### Landing Page
![Landing_page](https://user-images.githubusercontent.com/47114134/138665468-32b79e3f-f5ac-488c-ab22-72888369899e.png)

### Search options
![Search_Group_Filter_Results](https://user-images.githubusercontent.com/47114134/138665526-9eb39593-2bfd-447d-b732-7144a21315cf.JPG)

### Auto Complete
![AutoComplete](https://user-images.githubusercontent.com/47114134/138665561-d8c3feba-f86b-4703-81e0-68a5a1454088.png)

### Cricketer card
![Cricketer_card](https://user-images.githubusercontent.com/47114134/138665589-96accb4f-570b-428d-bd82-e10bd1605b3a.png)

### Full Cricketer
![Full_Cricketer_1](https://user-images.githubusercontent.com/47114134/138665640-33af17cc-ff82-4d0b-979b-343253e72805.JPG)

![Full_Cricketer_2](https://user-images.githubusercontent.com/47114134/138665654-95379736-7147-4187-94fc-77e764f4fcad.JPG)

![Full_Cricketer_3](https://user-images.githubusercontent.com/47114134/138665669-3c7a2526-2a66-4f31-89f7-2224a7209fa5.JPG)

