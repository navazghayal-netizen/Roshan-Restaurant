# JSONBin Setup — Roshan Restaurant

JSONBin se products permanently cloud mein save honge.
Admin se koi bhi change karo — duniya mein koi bhi web khole, same data dikhega.

---

## Step 1 — JSONBin Account Banao (2 min)

1. Phone ya laptop se browser mein kholo: **https://jsonbin.io**
2. "Sign Up" karo — Google se bhi ho sakta hai
3. Login hone ke baad Dashboard dikhega

---

## Step 2 — Bin Banao

1. Dashboard mein **"Create a Bin"** button dabao
2. Andar ye content daalo:

```json
[]
```

3. **"Create Bin"** dabao
4. Ek **Bin ID** milega jaise: `6642f3c4e41b4d34e4199abc`
   — Isko copy karo, kaam aayega

---

## Step 3 — API Key Lo

1. Dashboard mein upar **Account → API Keys** mein jao
2. **"Add API Key"** dabao
3. Key generate hogi jaise: `$2b$10$xyz...`
   — Isko bhi copy karo

---

## Step 4 — Render/Railway mein Environment Variables Daalo

### Render pe:
1. Apna project kholo → **Environment** tab
2. Ye do variables add karo:

| Key | Value |
|-----|-------|
| `JSONBIN_BIN_ID` | tumhara Bin ID |
| `JSONBIN_API_KEY` | tumhari API Key |

3. **Save** karo — server automatically restart ho jayega

### Railway pe:
1. Project → **Variables** tab
2. Same do variables add karo
3. **Deploy** karo

---

## Step 5 — Verify karo

Browser mein kholo:
```
https://tumhari-website.com/api/health
```

Agar ye dikhe:
```json
{"status":"ok","jsonbin":true}
```

Toh **sab sahi hai!** 🎉

Agar `"jsonbin":false` dikhe toh .env mein keys galat hain.

---

## Kaise kaam karta hai

```
Owner (Admin Page)
     ↓ product edit/add/delete
  JSONBin Cloud  ←→  Server
     ↑ fetch every time
Customer (Main Website)
```

- Admin se change karo → JSONBin pe save hota hai
- Koi bhi customer website khole → Server JSONBin se latest data lata hai
- Server restart ho jaye → Koi fark nahi, data JSONBin mein safe hai

---

## Image Upload ke baare mein

Images server pe store hoti hain (Image/ folder).
Agar server restart ho toh **uploaded images delete ho sakti hain** (free hosting limitation).

**Behtar solution:** Image ke liye URL use karo.
- Google Photos ya Imgur pe image upload karo
- Wahan se link copy karo
- Admin mein "Image URL" field mein paste karo

---

## Help chahiye?

`/api/health` endpoint check karo hamesha pehle.
