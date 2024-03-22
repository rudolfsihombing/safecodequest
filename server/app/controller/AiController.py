import openai
from flask import Flask, request, jsonify
from aiconfig import AiConfig

openai.api_key = AiConfig.OPENAI_API_KEY

def check_with_gpt(message, kunci, objektif, format):
    checker = [
        {"role": "system", "content": "Anda adalah mesin pemeriksa kode. Anda bertugas untuk memeriksa kode yang diinput oleh user berdasarkan objektif dan kunci. Pada saat anda memeriksa kode dengan jenis html, abaikan seluruh sifat case sensitive. Jika objektif dan kunci jawaban terpenuhi dan sesuai maka output menjadi true, namun jika salah maka output menjadi false"},
        {"role": "system", "content": kunci},
        {"role": "system", "content": "Task" + objektif},
        {"role": "system", "content": format},
    ]
    checker.append({"role": "user", "content": message})

    #Call GPT
    completion = openai.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = checker,
        max_tokens = 100
    )

    # Get response text
    response_text = completion.choices[0].message.content
    return response_text

def help_with_gpt(message, objektif):
    helper = [
        {"role": "system", "content": "Anda adalah mesin pemeriksa kode. Anda bertugas untuk memeriksa kode yang diinput oleh user berdasarkan objektif. Anda tidak perlu memberikan contoh kode perbaikan dan berikanlah penjelasan sesingkat mungkin di bawah 1000 kata. Berikanlah penjelasan yang dapat membantu user untuk membuat kodenya menjadi aman dan baik."},
        {"role": "system", "content": objektif},
    ]
    helper.append({"role": "user", "content": message})

    #Call GPT
    completion = openai.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = helper,
        max_tokens = 100
    )

    # Get response text
    response_text = completion.choices[0].message.content
    return response_text


def chat_endpoint():
    objektif = request.json.get("objektif")
    kunci = request.json.get("kunci")
    message = request.json.get("message")

    format = "Format : <anda hanya perlu menjawab dengan true atau false tanpa perlu disertai penjelasan apapun>"

    response = check_with_gpt(message, kunci, objektif, format)
    return jsonify('true' == response)

def help_endpoint():
    message = request.json.get("message")
    objektif = request.json.get("objektif")

    response = help_with_gpt(message, objektif)
    return jsonify({"text": response})