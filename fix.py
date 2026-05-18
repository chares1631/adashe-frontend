content = open('/home/hpboiz/adashe-frontend/src/App.tsx').read()
# Remove the duplicate ConnectButton in header
old = '        <ConnectButton />\n      </header>'
new = '      </header>'
content = content.replace(old, new)
open('/home/hpboiz/adashe-frontend/src/App.tsx', 'w').write(content)
print('Done! Header ConnectButton removed.')
