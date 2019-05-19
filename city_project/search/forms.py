from django import forms


class DateTypeInput(forms.DateInput):
    input_type = 'date'


class RestauranForm(forms.Form):
    keywords = forms.CharField(label='Name or keywords', required=False)
    radius = forms.IntegerField(label='Radius(km)', min_value=1, max_value=50, required=False)
    rest_type_choices = (
        ("R", "restourants"),
        ("C", "cafes"),
        ("CB", "coffe breaks"),
        ("B", "bakeries"),
        ("BAR", "bars"),
    )
    rest_type = forms.MultipleChoiceField(label='Type', widget=forms.CheckboxSelectMultiple(),
                                          choices=rest_type_choices)
    cuisines_choices = (
        ("UA", "Ukrainian"),
        ("IT", "Italian"),
        ("AS", "Asian"),
        ("USA", "American"),
        ("CH", "Chinese"),
    )
    cuisines = forms.MultipleChoiceField(label='Cuisines', widget=forms.CheckboxSelectMultiple(),
                                         choices=cuisines_choices)
    dietary_choices = (("VEG", "Vegeterian"), ("2", 2), ("3", 3), ("4", 4), ("5", 5))
    dietary = forms.ChoiceField(label='Dietary restrictions', choices=dietary_choices)
    time_choices = (("BR", "Breakfast"), ("2", 2), ("3", 3), ("4", 4), ("5", 5))
    time = forms.ChoiceField(label='Time', choices=time_choices)
    suitable_choices = (("BR", "Breakfast"), ("2", 2), ("3", 3), ("4", 4), ("5", 5))
    suitable = forms.ChoiceField(label='Suitable for', choices=suitable_choices)


class HotelsForm(forms.Form):
    keywords = forms.CharField(label='Name or keywords', required=False)
    radius = forms.IntegerField(label='Radius(km)', min_value=1, max_value=50, required=False)
    datein = forms.DateField(label='Check in', widget=DateTypeInput(), required=False)
    dateout = forms.DateField(label='Check out', widget=DateTypeInput(), required=False)
    adult = forms.IntegerField(label='Adult', min_value=1, max_value=8, initial=1)
    children = forms.IntegerField(label='Children', min_value=0, max_value=6, initial=0)
    pets_choices = (("Y", "YES"), ("N", "NO"))
    pets = forms.ChoiceField(label='Pets', choices=pets_choices)
    stars_choices = (("1", 1), ("2", 2), ("3", 3), ("4", 4), ("5", 5))
    stars = forms.ChoiceField(label='Stars', choices=stars_choices)
