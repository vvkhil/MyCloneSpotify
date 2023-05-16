import socket
import threading
import queue

messages = queue.Queue()
clients = []
unique_identifiers = []
server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  # define udp socket
history = []
"""
У сервера есть метод bind(), который привязывает его к определенному IP-адресу и порту,
чтобы он мог прослушивать входящие запросы на этот IP-адрес и порт.
"""
server.bind(("localhost", 9999))


# it will receive and store messages in the queue data
def receive():
    while True:
        try:
            message, addr = server.recvfrom(
                1024)  # мы получаем сообщение и адресс того, кто что-то отправил на наш сервер
            messages.put((message, addr))
        except:
            pass


# This method will receive the messages and distribute it between clients
def broadcast():

    while True:
        while not messages.empty():
            message, addr = messages.get()
            print(message.decode())
            if addr not in clients:
                clients.append(addr)

            if message.decode().startswith("IDENTIFIER_TAG:"):
                identifier = message.decode()[message.decode().index(":") + 1:]
                if identifier in unique_identifiers:
                    for letter in history:
                        server.sendto(letter.encode(), addr)
                else:
                    unique_identifiers.append(identifier)

            for client in clients:
                try:
                    if message.decode().startswith("REGISTRATION_TAG:"):
                        name = message.decode()[message.decode().index(":") + 1:]
                        server.sendto(f"{name} joined!".encode(), client)
                    elif message.decode().startswith("IDENTIFIER_TAG:"):
                        pass
                    else:
                        server.sendto(message, client)
                        history.append(message.decode())
                except:
                    pass

            # history.append(message.decode())


thread1 = threading.Thread(target=receive)
thread2 = threading.Thread(target=broadcast)

thread1.start()
thread2.start()
