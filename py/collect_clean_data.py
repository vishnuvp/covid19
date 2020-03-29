import pandas as pd

df1 = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
df1["Date"] = df1['Province/State']
df1['Date'].fillna(df1['Country/Region'], inplace=True)
df1=df1.drop(['Province/State','Country/Region','Lat','Long'], axis=1)
df1.set_index('Date', inplace=True)
df1 = df1.transpose()
df1 = df1[['India', 'Hubei', 'Italy', 'US', 'Spain', 'Germany', 'Iran', 'France', 'Korea, South', 'Malaysia', 'Ireland', 'Japan', 'Pakistan', 'Saudi Arabia', 'Indonesia', 'Taiwan*', 'United Arab Emirates', 'Qatar']]
df1.to_csv('covid19-data.csv')


