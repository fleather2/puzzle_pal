FROM ubuntu:24.04
USER root

RUN apt-get update && apt-get install -y net-tools iproute2 gcc g++ python3 python3-dev python3-venv python3-pip iputils-ping telnet vim docker.io libpq-dev
# install python modules
COPY ./requirements.txt /root/
RUN python3 -m pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --break-system-packages -r /root/requirements.txt
