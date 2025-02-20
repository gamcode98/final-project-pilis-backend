PGDMP  $                    {            cinema-system-db    14.3 (Debian 14.3-1.pgdg110+1)    16.0 (Debian 16.0-1.pgdg120+1) R    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    16384    cinema-system-db    DATABASE     }   CREATE DATABASE "cinema-system-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
 "   DROP DATABASE "cinema-system-db";
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            f           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    4            g           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    16386    cinema_shows    TABLE     �  CREATE TABLE public.cinema_shows (
    id integer NOT NULL,
    capacity_available integer NOT NULL,
    date date NOT NULL,
    hour integer NOT NULL,
    minutes integer NOT NULL,
    price real NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    movie_id integer,
    room_id integer
);
     DROP TABLE public.cinema_shows;
       public         heap    postgres    false    4            �            1259    16385    cinema_shows_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cinema_shows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.cinema_shows_id_seq;
       public          postgres    false    4    210            h           0    0    cinema_shows_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.cinema_shows_id_seq OWNED BY public.cinema_shows.id;
          public          postgres    false    209            �            1259    16410    images    TABLE     �   CREATE TABLE public.images (
    id integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.images;
       public         heap    postgres    false    4            �            1259    16409    images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.images_id_seq;
       public          postgres    false    4    214            i           0    0    images_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;
          public          postgres    false    213            �            1259    16395    movies    TABLE     }  CREATE TABLE public.movies (
    id integer NOT NULL,
    title text NOT NULL,
    gender text NOT NULL,
    director text NOT NULL,
    description text NOT NULL,
    trailer_url text NOT NULL,
    duration text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    image_id integer
);
    DROP TABLE public.movies;
       public         heap    postgres    false    4            �            1259    16394    movies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public          postgres    false    212    4            j           0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
          public          postgres    false    211            �            1259    16421    payments    TABLE     �   CREATE TABLE public.payments (
    id integer NOT NULL,
    transaction_amount real NOT NULL,
    payment_method text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ticket_id integer
);
    DROP TABLE public.payments;
       public         heap    postgres    false    4            �            1259    16420    payments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.payments_id_seq;
       public          postgres    false    216    4            k           0    0    payments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
          public          postgres    false    215            �            1259    16446    roles    TABLE     O   CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false    4            �            1259    16445    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    4    220            l           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    219            �            1259    16455    rooms    TABLE     �   CREATE TABLE public.rooms (
    id integer NOT NULL,
    name text NOT NULL,
    capacity integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.rooms;
       public         heap    postgres    false    4            �            1259    16454    rooms_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.rooms_id_seq;
       public          postgres    false    222    4            m           0    0    rooms_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;
          public          postgres    false    221            �            1259    16466    temporal_reservations    TABLE     :  CREATE TABLE public.temporal_reservations (
    id integer NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    cinema_show_id integer
);
 )   DROP TABLE public.temporal_reservations;
       public         heap    postgres    false    4            �            1259    16465    temporal_reservations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.temporal_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.temporal_reservations_id_seq;
       public          postgres    false    4    224            n           0    0    temporal_reservations_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.temporal_reservations_id_seq OWNED BY public.temporal_reservations.id;
          public          postgres    false    223            �            1259    16478    tickets    TABLE     n  CREATE TABLE public.tickets (
    id integer NOT NULL,
    qr_code text NOT NULL,
    code text NOT NULL,
    quantity real NOT NULL,
    is_working boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    cinema_shows_id integer,
    user_id integer
);
    DROP TABLE public.tickets;
       public         heap    postgres    false    4            �            1259    16477    tickets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tickets_id_seq;
       public          postgres    false    4    226            o           0    0    tickets_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;
          public          postgres    false    225            �            1259    16431    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    role_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16430    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218    4            p           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            �           2604    16389    cinema_shows id    DEFAULT     r   ALTER TABLE ONLY public.cinema_shows ALTER COLUMN id SET DEFAULT nextval('public.cinema_shows_id_seq'::regclass);
 >   ALTER TABLE public.cinema_shows ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    16413 	   images id    DEFAULT     f   ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);
 8   ALTER TABLE public.images ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    16398 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    16424    payments id    DEFAULT     j   ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
 :   ALTER TABLE public.payments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16449    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16458    rooms id    DEFAULT     d   ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);
 7   ALTER TABLE public.rooms ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    16469    temporal_reservations id    DEFAULT     �   ALTER TABLE ONLY public.temporal_reservations ALTER COLUMN id SET DEFAULT nextval('public.temporal_reservations_id_seq'::regclass);
 G   ALTER TABLE public.temporal_reservations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16481 
   tickets id    DEFAULT     h   ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);
 9   ALTER TABLE public.tickets ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    16434    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            O          0    16386    cinema_shows 
   TABLE DATA           �   COPY public.cinema_shows (id, capacity_available, date, hour, minutes, price, created_at, updated_at, movie_id, room_id) FROM stdin;
    public          postgres    false    210   �b       S          0    16410    images 
   TABLE DATA           A   COPY public.images (id, url, created_at, updated_at) FROM stdin;
    public          postgres    false    214   �c       Q          0    16395    movies 
   TABLE DATA           �   COPY public.movies (id, title, gender, director, description, trailer_url, duration, created_at, updated_at, image_id) FROM stdin;
    public          postgres    false    212   �d       U          0    16421    payments 
   TABLE DATA           a   COPY public.payments (id, transaction_amount, payment_method, created_at, ticket_id) FROM stdin;
    public          postgres    false    216   �f       Y          0    16446    roles 
   TABLE DATA           )   COPY public.roles (id, name) FROM stdin;
    public          postgres    false    220   g       [          0    16455    rooms 
   TABLE DATA           K   COPY public.rooms (id, name, capacity, created_at, updated_at) FROM stdin;
    public          postgres    false    222   ;g       ]          0    16466    temporal_reservations 
   TABLE DATA           m   COPY public.temporal_reservations (id, status, quantity, created_at, updated_at, cinema_show_id) FROM stdin;
    public          postgres    false    224   �g       _          0    16478    tickets 
   TABLE DATA           |   COPY public.tickets (id, qr_code, code, quantity, is_working, created_at, updated_at, cinema_shows_id, user_id) FROM stdin;
    public          postgres    false    226   �g       W          0    16431    users 
   TABLE DATA           _   COPY public.users (id, username, email, password, created_at, updated_at, role_id) FROM stdin;
    public          postgres    false    218   �g       q           0    0    cinema_shows_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cinema_shows_id_seq', 9, true);
          public          postgres    false    209            r           0    0    images_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.images_id_seq', 3, true);
          public          postgres    false    213            s           0    0    movies_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.movies_id_seq', 3, true);
          public          postgres    false    211            t           0    0    payments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.payments_id_seq', 1, false);
          public          postgres    false    215            u           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    219            v           0    0    rooms_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.rooms_id_seq', 2, true);
          public          postgres    false    221            w           0    0    temporal_reservations_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.temporal_reservations_id_seq', 1, false);
          public          postgres    false    223            x           0    0    tickets_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.tickets_id_seq', 1, false);
          public          postgres    false    225            y           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    217            �           2606    16464 $   rooms PK_0368a2d7c215f2d0458a54933f2 
   CONSTRAINT     d   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.rooms DROP CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2";
       public            postgres    false    222            �           2606    16476 4   temporal_reservations PK_0f65f883d2fb02572e665efe52c 
   CONSTRAINT     t   ALTER TABLE ONLY public.temporal_reservations
    ADD CONSTRAINT "PK_0f65f883d2fb02572e665efe52c" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.temporal_reservations DROP CONSTRAINT "PK_0f65f883d2fb02572e665efe52c";
       public            postgres    false    224            �           2606    16429 '   payments PK_197ab7af18c93fbb0c9b28b4a59 
   CONSTRAINT     g   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.payments DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59";
       public            postgres    false    216            �           2606    16419 %   images PK_1fe148074c6a1a91b63cb9ee3c9 
   CONSTRAINT     e   ALTER TABLE ONLY public.images
    ADD CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.images DROP CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9";
       public            postgres    false    214            �           2606    16488 &   tickets PK_343bc942ae261cf7a1377f48fd0 
   CONSTRAINT     f   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.tickets DROP CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0";
       public            postgres    false    226            �           2606    16440 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public            postgres    false    218            �           2606    16393 +   cinema_shows PK_b6c4614926c7c6867bad5a16bc1 
   CONSTRAINT     k   ALTER TABLE ONLY public.cinema_shows
    ADD CONSTRAINT "PK_b6c4614926c7c6867bad5a16bc1" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.cinema_shows DROP CONSTRAINT "PK_b6c4614926c7c6867bad5a16bc1";
       public            postgres    false    210            �           2606    16453 $   roles PK_c1433d71a4838793a49dcad46ab 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
       public            postgres    false    220            �           2606    16404 %   movies PK_c5b2c134e871bfd1c2fe7cc3705 
   CONSTRAINT     e   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705";
       public            postgres    false    212            �           2606    16408 %   movies REL_c16f2345495a9f105a0d940b98 
   CONSTRAINT     f   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "REL_c16f2345495a9f105a0d940b98" UNIQUE (image_id);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "REL_c16f2345495a9f105a0d940b98";
       public            postgres    false    212            �           2606    16406 %   movies UQ_5aa0bbd146c0082d3fc5a0ad5d8 
   CONSTRAINT     c   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8" UNIQUE (title);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8";
       public            postgres    false    212            �           2606    16444 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    218            �           2606    16442 $   users UQ_fe0bb3f6520ee0469504521e710 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
       public            postgres    false    218            �           2606    16524 &   tickets FK_2e445270177206a97921e461710    FK CONSTRAINT     �   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY (user_id) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.tickets DROP CONSTRAINT "FK_2e445270177206a97921e461710";
       public          postgres    false    3246    218    226            �           2606    16489 +   cinema_shows FK_759da7249405655901060e89c07    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_shows
    ADD CONSTRAINT "FK_759da7249405655901060e89c07" FOREIGN KEY (movie_id) REFERENCES public.movies(id);
 W   ALTER TABLE ONLY public.cinema_shows DROP CONSTRAINT "FK_759da7249405655901060e89c07";
       public          postgres    false    212    210    3236            �           2606    16514 4   temporal_reservations FK_8b29b6f87b680e6c3a07e74670e    FK CONSTRAINT     �   ALTER TABLE ONLY public.temporal_reservations
    ADD CONSTRAINT "FK_8b29b6f87b680e6c3a07e74670e" FOREIGN KEY (cinema_show_id) REFERENCES public.cinema_shows(id);
 `   ALTER TABLE ONLY public.temporal_reservations DROP CONSTRAINT "FK_8b29b6f87b680e6c3a07e74670e";
       public          postgres    false    224    210    3234            �           2606    16519 &   tickets FK_9ab330f17f45529754fccf4987d    FK CONSTRAINT     �   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_9ab330f17f45529754fccf4987d" FOREIGN KEY (cinema_shows_id) REFERENCES public.cinema_shows(id);
 R   ALTER TABLE ONLY public.tickets DROP CONSTRAINT "FK_9ab330f17f45529754fccf4987d";
       public          postgres    false    226    210    3234            �           2606    16509 $   users FK_a2cecd1a3531c0b041e29ba46e1    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id) REFERENCES public.roles(id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1";
       public          postgres    false    220    218    3252            �           2606    16504 '   payments FK_aac3e9d7b82ecaeb355f2f4e0d1    FK CONSTRAINT     �   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "FK_aac3e9d7b82ecaeb355f2f4e0d1" FOREIGN KEY (ticket_id) REFERENCES public.tickets(id);
 S   ALTER TABLE ONLY public.payments DROP CONSTRAINT "FK_aac3e9d7b82ecaeb355f2f4e0d1";
       public          postgres    false    216    226    3258            �           2606    16499 %   movies FK_c16f2345495a9f105a0d940b985    FK CONSTRAINT     �   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "FK_c16f2345495a9f105a0d940b985" FOREIGN KEY (image_id) REFERENCES public.images(id);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "FK_c16f2345495a9f105a0d940b985";
       public          postgres    false    214    3242    212            �           2606    16494 +   cinema_shows FK_d93b9c50f5304595882687f3f0b    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_shows
    ADD CONSTRAINT "FK_d93b9c50f5304595882687f3f0b" FOREIGN KEY (room_id) REFERENCES public.rooms(id);
 W   ALTER TABLE ONLY public.cinema_shows DROP CONSTRAINT "FK_d93b9c50f5304595882687f3f0b";
       public          postgres    false    210    222    3254            O   �   x���[j @�o]E70!�D�2�_G3e`�V)�^<(���Y��Y��}����8ѧ%P�"�)^��"�Q�λ�3&9����S�C�S��&�4B���u�΢@�d�5�i��g�'���m.�L�����A���5��y�:館1W�%)3Sn����>�%��Q��)���;?I�'�޿|��      S   �   x���9r�  �ڜ"��Y� �%��>�[�����k���{�4!�۰�s�h֊��m�~��L�����g3��Zu E'����1)W|�ա�7�³����x
����E��B���T�o�3��yf���8������T���Li�JA)���`�Z~�en�96��m�����^�h�q�[x��	}c��v�U      Q   D  x�}��N1��7O1���V�*�P
)���R5�N6F^{c�7��ᒋ>E^�cRnJ��ʫ9>���$�5Zi��	SS��N�_���]ES�`E�F͇F���}�_����J�A ih��P	�-T�ۂRT�����4���%kwϚԻ�J
�@
֞��E��KK��[B��C�{j6�,4h,9��`o��X�9�9��Vm۸��pk|�:��Ž�E3*��N~��"����d��ͯ�I��Q��A||�f�y<·�`2L���G���F3����4Zk����X!g*Vؑ��X�Bb���x g
Б�[Ñ��liZ�,�3_ql�$���FF�D豕�K6 atk���'��_o�yBo�+mO������ބУ��dI���p2'�G�,:�hK��\��K�P�D茂�R�X���k�x29Y��$ڰ�}u�ٽ��b�s��eXs����6����+wh�ec�e(i�@X��Yёu�"hO�B��釲	�ϗ����X�������^��췈��{�Z����i�N.��ǅ�f/
q����8��w|�y�����Q��9��z �)�      U      x������ � �      Y       x�3�L.-.��M-�2�LL�������� ]��      [   I   x�3�t-.I�I,�41�4202�5��52V00�20�24ӳ02662�#�e����X�i�� SS<R\1z\\\ �pR      ]      x������ � �      _      x������ � �      W   z   x�3�LL��̃�鹉�9z����*FI*�*y���A�y>fE�U�U^^fa��n.E�ήن�an�&��Q)��E�f9��FFƺ��F�
VFV�fz���fx��b���� �l&�     