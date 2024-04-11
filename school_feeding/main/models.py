from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models

from . import utils

# Create your models here.



class CustomUser(AbstractUser):
    phone = models.CharField("Phone", max_length=60)
    username = models.CharField("Name", null=True, blank=True, unique=False)
    date_joined = models.DateField("Date Joined", null=True, blank=True)
    email = models.EmailField(unique=True)
    # changes
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Օգտատեր"
        verbose_name_plural = "Օգտատերեր"

    def __str__(self):
        return str(self.username)
    


class PasswordChange(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    password = models.CharField("Old Password", max_length = 110)
    new_password = models.CharField("New Password", max_length = 110)

    def __str__(self):
        return str(self.user)


# verify
class EmailVerificationToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token


class Team(models.Model):
    region = models.CharField("Մարզ", choices=utils.REGION_CHOICES)
    town = models.CharField("Գյուղ/Քաղաք", max_length=100)
    school_name = models.CharField("Դպրոցի անուն", max_length=250)
    name = models.CharField("Անուն", max_length=20)
    lastname = models.CharField("Ազգանուն", max_length=30)
    email = models.EmailField("Էլեկտրոնային հասցե", unique=True)
    phone = models.BigIntegerField("Հեռախոսի համար")
    team_cat = models.CharField("Խմբի տեսակ", choices=utils.CLASS_CHOICES)
    project_cat = models.CharField("Պրոեկտի տեսակ", choices=utils.CATEGORY_CHOICES)

    class Meta:
        verbose_name = "Թիմ"
        verbose_name_plural = "Թմեր"

    def __str__(self):
        return self.email


class ApplicationForm(models.Model):
    region = models.CharField("Մարզ", choices=utils.REGION_CHOICES)
    town = models.CharField("Գյուղ/Քաղաք", max_length=100)
    school_name = models.CharField("Դպրոցի անուն", max_length=250)
    contact_person = models.CharField("Կոնտակտային անձ", max_length=50)
    email = models.EmailField("Էլեկտրոնային հասցե", unique=True)
    phone = models.BigIntegerField("Հեռախոսի համար")
    birth = models.DateField('Ծննդյան ամսաթիվ')
    age_cat = models.CharField('Տարիքային խումբ', max_length = 120)
    project_cat1 = models.CharField('Ծրագրի տեսակ 1', max_length = 120, blank = True, null = True)
    project_cat2 = models.CharField('Ծրագրի տեսակ 2', max_length = 120, blank = True, null = True)
    project_cat3 = models.CharField('Ծրագրի տեսակ 3', max_length = 120, blank = True, null = True)
    project_cat4 = models.CharField('Ծրագրի տեսակ 4', max_length = 120, blank = True, null = True)


    class Meta:
        verbose_name = "Ծրագրի գրանցում"
        verbose_name_plural = "Ծրագրի գրանցումներ"
        
    def __str__(self) -> str:
        return f"{self.school_name +' ' + '(' + self.age_cat + ')' }"


class Project1(models.Model):
    team = models.ForeignKey(ApplicationForm, verbose_name="Թիմ", on_delete=models.CASCADE, null=True)
    name1 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name2 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name3 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name4 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    word = models.FileField(
        "Word",
        upload_to="words/",
        validators=[
            FileExtensionValidator(allowed_extensions=["docx", "doc"]),
        ],
    )
    img1 = models.ImageField("Նկար 1", null=True, blank=True)
    img2 = models.ImageField("Նկար 2", null=True, blank=True)
    img3 = models.ImageField("Նկար 3", null=True, blank=True)
    img4 = models.ImageField("Նկար 4", null=True, blank=True)
    img5 = models.ImageField("Նկար 5", null=True, blank=True)
    img6 = models.ImageField("Նկար 6", null=True, blank=True)
    img7 = models.ImageField("Նկար 7", null=True, blank=True)
    img8 = models.ImageField("Նկար 8", null=True, blank=True)
    img9 = models.ImageField("Նկար 9", null=True, blank=True)
    img10 = models.ImageField("Նկար 10", null=True, blank=True)
    pdf = models.FileField(
        "PDF/PPT",
        upload_to="pdf-ppt/",
        validators=[
            FileExtensionValidator(allowed_extensions=["pdf", "ppt", "pptx"])
        ],
    )
    video = models.FileField(
        "Video",
        upload_to="videos/",
        validators=[    
            utils.validate_video_size,
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "wmv", "mov"]),
        ],
    )
    
    
    class Meta:
        verbose_name = "Առողջ Ապրելակերպը խաղի ձևով"
        verbose_name_plural = "Առողջ Ապրելակերպը խաղի ձևով"

class Project2(models.Model):
    team = models.ForeignKey(ApplicationForm, verbose_name="Թիմ", on_delete=models.CASCADE, null=True)
    
    name1 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name2 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name3 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name4 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    word = models.FileField(
        "Word",
        upload_to="words/",
        validators=[
            FileExtensionValidator(allowed_extensions=["docx", "doc"]),
        ],
    )
    img1 = models.ImageField("Նկար 1", null=True, blank=True)
    img2 = models.ImageField("Նկար 2", null=True, blank=True)
    img3 = models.ImageField("Նկար 3", null=True, blank=True)
    img4 = models.ImageField("Նկար 4", null=True, blank=True)
    img5 = models.ImageField("Նկար 5", null=True, blank=True)
    img6 = models.ImageField("Նկար 6", null=True, blank=True)
    img7 = models.ImageField("Նկար 7", null=True, blank=True)
    img8 = models.ImageField("Նկար 8", null=True, blank=True)
    img9 = models.ImageField("Նկար 9", null=True, blank=True)
    img10 = models.ImageField("Նկար 10", null=True, blank=True)
    pdf = models.FileField("PDF/PPT",upload_to="pdf-ppt/",validators=[
            FileExtensionValidator(allowed_extensions=["pdf", "ppt", "pptx"])
        ],
    )
    
    video = models.FileField(
        "Video",
        upload_to="videos/",
        validators=[
            utils.validate_video_size,
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "wmv", "mov"]),
        ],
    )
    

    class Meta:
        verbose_name = "Համեղ և առողջարար, իմ սիրելի առողջարար բաղադրատոմսը"
        verbose_name_plural = "Համեղ և առողջարար, իմ սիրելի առողջարար բաղադրատոմսը"  

class Project3(models.Model):
    team = models.ForeignKey(ApplicationForm, verbose_name="Թիմ", on_delete=models.CASCADE, null=True)

    name1 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name2 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name3 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name4 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    word = models.FileField(
        "Word",
        upload_to="words/",
        validators=[
            FileExtensionValidator(allowed_extensions=["docx", "doc"]),
        ],
    )
    img1 = models.ImageField("Նկար 1", null=True, blank=True)
    img2 = models.ImageField("Նկար 2", null=True, blank=True)
    img3 = models.ImageField("Նկար 3", null=True, blank=True)
    img4 = models.ImageField("Նկար 4", null=True, blank=True)
    img5 = models.ImageField("Նկար 5", null=True, blank=True)
    pdf = models.FileField(
        "PDF/PPT",
        upload_to="pdf-ppt/",
        validators=[
            FileExtensionValidator(allowed_extensions=["pdf", "ppt", "pptx"])
        ],
    )
    pdf_only = models.FileField(
        "PDF",
        upload_to="pdf-ppt/",
        validators=[
            FileExtensionValidator(allowed_extensions=["pdf"])
        ],
    )
    video = models.FileField(
        "Video",
        upload_to="videos/",
        validators=[
            utils.validate_video_size,
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "wmv", "mov"]),
        ],
    )

    class Meta:
        verbose_name = "Բացահայտելով առողջ ապրելակերպի աշխարհը․ մեր հետազոտությունը"
        verbose_name_plural = "Բացահայտելով առողջ ապրելակերպի աշխարհը․ մեր հետազոտությունը"

class Project4(models.Model):
    team = models.ForeignKey(ApplicationForm, verbose_name="Թիմ", on_delete=models.CASCADE, null=True)

    name1 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name2 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name3 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    name4 = models.CharField("Մասնակցի անուն", max_length=50, null=True, blank=True)
    word = models.FileField(
        "Word",
        upload_to="words/",
        validators=[
            FileExtensionValidator(allowed_extensions=["docx", "doc"]),
        ],
    )
    img1 = models.ImageField("Նկար 1", null=True, blank=True)
    img2 = models.ImageField("Նկար 2", null=True, blank=True)
    img3 = models.ImageField("Նկար 3", null=True, blank=True)
    img4 = models.ImageField("Նկար 4", null=True, blank=True)
    img5 = models.ImageField("Նկար 5", null=True, blank=True)
    pdf = models.FileField(
        "PDF/PPT",
        upload_to="pdf-ppt/",
        validators=[
            FileExtensionValidator(allowed_extensions=["pdf", "ppt", "pptx"])
        ],
    )
    pdf_only = models.FileField(
        "PDF",
        upload_to="pdf-ppt/",
        validators=[
            FileExtensionValidator(allowed_extensions=["pdf"])
        ],
    )
    video = models.FileField(
        "Video",
        upload_to="videos/",
        validators=[
            utils.validate_video_size,
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "wmv", "mov"]),
        ],
    )
    

    class Meta:
        verbose_name = "Իմ առողջ համայնքը"
        verbose_name_plural = "Իմ առողջ համայնքը"


class Registration(models.Model):
    region = models.CharField("Մարզ", choices=utils.REGION_CHOICES)
    town = models.CharField("Գյուղ/Քաղաք", max_length=100)
    school_name = models.CharField("Դպրոցի անուն", max_length=250)
    contact_person = models.CharField("Կոնտակտային անձ", max_length=50)
    email = models.EmailField("Էլեկտրոնային հասցե", unique=True)
    phone = models.BigIntegerField("Հեռախոսի համար")

    class Meta:
        verbose_name = "Գրանցում"
        verbose_name_plural = "Գրանցումներ"

    def __str__(self) -> str:
        return str(self.contact_person)


class Message(models.Model):
    name = models.CharField("Անուն", max_length=50)
    email = models.EmailField("Էլ․ հասցե")
    message = models.CharField("Նամակ", max_length=255)  
    phone = models.BigIntegerField("Հեռախոսահամար")

    class Meta:
        verbose_name = "Նամակ"
        verbose_name_plural = "Նամակներ"

    def __str__(self) -> str:
        return str(self.email)


# changes voting


class VotableItem(models.Model):
    word = models.FileField("word ")
    img1 = models.ImageField("Նկար 1", null=True, blank=True)
    img2 = models.ImageField("Նկար 2", null=True, blank=True)
    img3 = models.ImageField("Նկար 3", null=True, blank=True)
    img4 = models.ImageField("Նկար 4", null=True, blank=True)
    img5 = models.ImageField("Նկար 5", null=True, blank=True)
    img6 = models.ImageField("Նկար 6", null=True, blank=True)
    img7 = models.ImageField("Նկար 7", null=True, blank=True)
    img8 = models.ImageField("Նկար 8", null=True, blank=True)
    img9 = models.ImageField("Նկար 9", null=True, blank=True)
    img10 = models.ImageField("Նկար 10", null=True, blank=True)
    pdf = models.FileField("pdf")
    video = models.FileField(
        "Video",
        upload_to="videos/",
        validators=[
            utils.validate_video_size,
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "wmv", "mov"]),
        ],
    )
    team_cat = models.CharField(
        "Խմբի տեսակ", choices=utils.CLASS_CHOICES, null=True, blank=True
    )
    project_cat = models.CharField("Պրոեկտի տեսակ", choices=utils.CATEGORY_CHOICES)
    school_name = models.CharField("Դպրոց", null=True, blank=True)

    def __str__(self) -> str:
        return str(self.project_cat)



class Vote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item = models.ForeignKey(VotableItem, on_delete=models.CASCADE)
    value = models.IntegerField()

    def __str__(self) -> str:
        return str(self.item)
