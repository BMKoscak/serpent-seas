import re
css=open('/home/claude/work/cm/package/lib/codemirror.css').read()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S); css=re.sub(r'\n\s*\n','\n',css)
s=open('index.src.html').read().replace('/*__CM_CSS__*/',css)
import os
s=re.sub(r'<script src="islands/(c\d+)\.js"></script>\n', lambda m: m.group(0) if os.path.exists('islands/'+m.group(1)+'.js') else '', s)
FAV="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='31' fill='%23173a47'/%3E%3Cpath d='M20 52c-2-10 0-24 10-30 8-5 18-2 20 6 2 7-3 12-8 14l-4 12z' fill='%234fae6c'/%3E%3Ccircle cx='38' cy='27' r='5.6' fill='%23ece2c9'/%3E%3Ccircle cx='39' cy='27' r='2.6' fill='%230a1a21'/%3E%3Cpath d='M44 30c6 0 9 4 7 9-2-2-4-3-7-3z' fill='%23e2a948'/%3E%3Cpath d='M22 44c-4 2-6 6-5 12 3-3 6-5 9-6z' fill='%23ef6b54'/%3E%3C/svg%3E"
HEAD=f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Serpent Seas</title>
<meta name="description" content="A pirate adventure that teaches Python from your first print() to object-oriented programming. Real Python in your browser, in English and Slovenian.">
<meta property="og:title" content="Serpent Seas - learn Python on the high seas">
<meta property="og:description" content="14 islands, 146 coding challenges, a 3D sea and a very sarcastic parrot. Real Python runs right in your browser.">
<meta name="theme-color" content="#0a1a21">
<link rel="icon" href="{FAV}">
"""
s=re.sub(r'^<meta charset="utf-8">\n','',s)
s=re.sub(r'^<title>.*?</title>\n','',s)
s=s.replace('<meta name="claude:viewport-fit-sides" content="cover">\n','')
j=s.find('<div class="toasts"')
s=HEAD+s[:j]+'</head>\n<body>\n'+s[j:]+'\n</body>\n</html>\n'
open('index.html','w').write(s)
m=re.findall(r'<script>(.*?)</script>',s,re.S); open('/home/claude/work/app.js','w').write(m[-1])
print(len(s))
