@echo off
for /r "F:\Other\jarpot.github.io\docs\03--js基础部分" %f in (*.md) do @xcopy "%f" "F:\Other\jarpot.github.io\docs\all\" /f/y
pause 