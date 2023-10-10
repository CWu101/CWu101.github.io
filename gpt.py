import openai

openai.api_key = "key"

while(1):
    msg = input()

    if msg=='':
        break
    
    response = openai.Completion.create(

        engine ="text-davinci-002",

        prompt = msg,

        max_tokens = 50,

        #conversation_id = convId

        #temperature = 0.2,

        #n = 1

        )



    ans = str(response.choices[0].text)[str(response.choices[0].text).find('\n')+1:]

    print(ans)