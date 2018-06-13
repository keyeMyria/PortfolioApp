from threading import Thread

import requests
from django.contrib.auth import get_user_model

User = get_user_model()


class OPENDOTA:
    PLAYERS = "https://api.opendota.com/api/players/{account_id}"


RANK_TIERS = [
    'Uncalibrated',
    'Herald',
    'Guardian',
    'Crusader',
    'Archon',
    'Legend',
    'Ancient',
    'Divine',
]

