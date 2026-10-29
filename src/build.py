import re
css=open('/tmp/claude-0/-home-claude/56c3dbb9-1d1c-52e8-9390-36be780ae302/scratchpad/pkgs/cm/package/lib/codemirror.css').read()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S); css=re.sub(r'\n\s*\n','\n',css)
s=open('index.src.html').read().replace('/*__CM_CSS__*/',css)
import os
s=re.sub(r'<script src="islands/(c\d+)\.js"></script>\n', lambda m: m.group(0) if os.path.exists('islands/'+m.group(1)+'.js') else '', s)
open('index.html','w').write(s)
m=re.findall(r'<script>(.*?)</script>',s,re.S); open('/tmp/claude-0/-home-claude/56c3dbb9-1d1c-52e8-9390-36be780ae302/scratchpad/app.js','w').write(m[-1])
print(len(s))
