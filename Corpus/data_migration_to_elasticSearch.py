import requests

json_data =[]  #assign the data you want to add to elasticsearch


# Making a PUT request
headers={'Content-type': 'application/json'}
count=1
for i in json_data:
    r = requests.put('http://localhost:9200/srilankancricketers/_doc/'+str(count), json =i)
    count=count+1
    # check status code for response received
    # success code - 200
    print(r)
    print (count)
     
    # print content of request
    #print(r.content)
