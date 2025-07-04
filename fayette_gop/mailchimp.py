import os
import hashlib
import requests

API_KEY = os.getenv("MAILCHIMP_API_KEY", "")
LIST_ID = os.getenv("MAILCHIMP_LIST_ID", "")

if API_KEY:
    DC = API_KEY.split("-")[-1]
    BASE_URL = f"https://{DC}.api.mailchimp.com/3.0"
else:
    BASE_URL = ""


def subscribe(email: str, status: str = "subscribed") -> bool:
    """Subscribe an email to the Mailchimp list. Returns True if OK."""
    if not API_KEY or not LIST_ID:
        return False
    subscriber_hash = hashlib.md5(email.lower().encode()).hexdigest()
    url = f"{BASE_URL}/lists/{LIST_ID}/members/{subscriber_hash}"
    data = {"email_address": email, "status_if_new": status}
    resp = requests.put(url, auth=("anystring", API_KEY), json=data, timeout=10)
    return resp.status_code in (200, 204)