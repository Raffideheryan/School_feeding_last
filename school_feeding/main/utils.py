import hashlib
from pathlib import Path

# import cv2
import environ
import vt
from django.core.exceptions import ValidationError

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")


async def is_malicious_async(file):
    client = vt.Client(env("VT_API_KEY"))
    file_data = file.read()
    sha256hash = hashlib.sha256(file_data).hexdigest()
    try:
        analysis = await client.get_object_async("/files/{}", sha256hash)
        category = analysis.sandbox_verdicts["Lastline"]["category"]
    except vt.error.APIError:
        category = None
    return True if category == "malicious" else False


# models.py
REGION_CHOICES = [
    ("Արագածոտն", "Արագածոտն"),
    ("Արարատ", "Արարատ"),
    ("Արմավիր", "Արմավիր"),
    ("Գեղարքունիք", "Գեղարքունիք"),
    ("Կոտայք", "Կոտայք"),
    ("Լոռի", "Լոռի"),
    ("Շիրակ", "Շիրակ"),
    ("Սյունիք", "Սյունիք"),
    ("Տավուշ", "Տավուշ"),
    ("Վայոց Ձոր", "Վայոց Ձոր"),
    ("Երևան", "Երևան"),
]

CLASS_CHOICES = [
    ("5-6", "5-6 grades"),
    ("7-8", "7-8 grades"),
    ("2-teams", "We have 2 teams of both age groups (5-6 and 7-8 grades)"),
]


CATEGORY_CHOICES = [
    ("healthy_lifestyle", 'Game on the topic "Healthy lifestyle in a playful way”'),
    ("healthy_recipes", '"Tasty and Healthy: My Favorite Healthy Recipes"'),
    (
        "research",
        'Research on the topic "Discovering the World of Healthy lifestyle: Our Research"',
    ),
    ("social_project", "A Social Project “My Healthy Community”"),
]


def validate_video_size(video):
    GB = 1073741824
    if video.size > GB:
        raise ValidationError("The maximum video size allowed is 1GB.")


# def validate_video_duration(video):
#     three_minuts = 180
#     try:
#         cap = cv2.VideoCapture(video.file.name)
#         frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#         fps = int(cap.get(cv2.CAP_PROP_FPS))
#         duration_seconds = frame_count / fps
#         if duration_seconds > three_minuts:
#             raise ValidationError("Video duration cannot exceed 3 minutes.")
#         else:
#             raise ValidationError("The maximum video durations allowed is 3 minuts")
#     except Exception:
#         raise ValidationError("An error occurred while validating the video duration.")
